import { CookieJar } from 'tough-cookie';
import { SettingsEnum } from './enums';
import { IHeader, IInvoice, ISeller, ISettings } from './interfaces';
import { Invoice } from './modules';
import { Builder, parseStringPromise } from 'xml2js';
import FormData from 'form-data';
import { omitEmpty } from './helpers';

export class SzamlazzAgentClient {
  private cookieJar: CookieJar | undefined;
  private options: ISettings | undefined;
  public lastRequestXML: string | undefined;

  constructor(options: ISettings) {
    if (!options || Object.keys(options).length === 0) {
      throw new Error('SzamlazzAgentClient requires options');
    }

    if (!options.authToken && !options.user && !options.password) {
      throw new Error('SzamlazzAgentClient requires authToken or username and password');
    }

    if (!options.user && !options.authToken) {
      throw new Error('SzamlazzAgentClient requires username');
    }

    if (!options.password && !options.authToken) {
      throw new Error('SzamlazzAgentClient requires password');
    }

    this.options = { responseVersion: 1, ...options };

    this.cookieJar = new CookieJar();
  }

  public async sendInvoice(invoice: IInvoice) {
    let xml = Invoice.getInvoiceXML(invoice);

    xml = `${this.setXmlHeader('xmlszamla', 'agent')}${this.settingsXml()}${xml}</xmlszamla>`;

    const response = await this.request('action-xmlagentxmlfile', xml);

    return response;
  }

  public async reverseInvoice(options: IHeader & { seller?: ISeller }) {
    let xml = Invoice.getReverseInvoiceXML(options);

    xml = `${this.setXmlHeader('xmlszamlast', 'agentst')}${this.settingsXml()}${xml}</xmlszamlast>`;
    this.lastRequestXML = xml;
    const response = await this.request('action-szamla_agent_st', xml);

    return response;
  }

  private setXmlHeader(tag = 'xmlszamla', dir = 'agent'): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <${tag} xmlns="http://www.szamlazz.hu/${tag}" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.szamlazz.hu/${tag} https://www.szamlazz.hu/szamla/docs/xsds/${dir}/${tag}.xsd">`;

    return xml;
  }

  private request = async (fieldName: string, xml: string) => {
    const data = new FormData();
    data.append(fieldName, xml, 'request.xml');

    const headers = new Headers({
      ...data.getHeaders(),
      Cookie: this.cookieJar?.getCookieStringSync('https://www.szamlazz.hu/szamla/') || '',
    });

    const request = new Request('https://www.szamlazz.hu/szamla/', {
      method: 'POST',
      body: data.getBuffer(),
      credentials: 'include',
      headers,
    });
    try {
      const httpResponse = await fetch(request);

      this.savingCookie(httpResponse);

      return await this.responseHandling(httpResponse);
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
      throw new Error((e as string) ?? 'Unknown error');
    }
  };

  private savingCookie = (response: Response) => {
    const cookie = response.headers.get('set-cookie');

    if (cookie) {
      this.cookieJar?.setCookieSync(cookie, 'https://www.szamlazz.hu/szamla/');
    }
  };

  private responseHandling = async (response: Response) => {
    const { headers, status, statusText } = response;

    if (status !== 200) {
      throw new Error(`${status} ${statusText}`);
    }

    const hError = headers.get('szlahu_error');
    const hErrorCode = headers.get('szlahu_error_code');

    if (hError) {
      throw new Error(`[code: ${hErrorCode}]: ${decodeURIComponent(hError).replace(/\+/g, ' ')}`);
    }

    const result: any = {
      invoiceNumber: headers.get('szlahu_szamlaszam'),
      netTotal: headers.get('szlahu_nettovegosszeg'),
      grossTotal: headers.get('szlahu_bruttovegosszeg'),
    };

    if (this.options?.requestInvoiceDownload) {
      if (this.options.responseVersion === 1) {
        const pdf = await response.text();
        result.pdf = Buffer.from(pdf, 'base64');
      } else if (this.options.responseVersion === 2) {
        const xml = await response.text();
        const json = await parseStringPromise(xml);
        const pdf = json.xmlszamlavalasz.pdf[0];
        result.pdf = Buffer.from(pdf, 'base64');
      }
    }

    return result;
  };

  private settingsXml = () => {
    const builder = new Builder({ headless: true, rootName: 'beallitasok' });
    const xml = builder.buildObject(this.mapSettings(this.options as ISettings));

    return xml;
  };

  private mapSettings = (options: ISettings) =>
    omitEmpty({
      [SettingsEnum.user]: options.user,
      [SettingsEnum.password]: options.password,
      [SettingsEnum.authToken]: options.authToken,
      [SettingsEnum.eInvoice]: options.eInvoice ?? false,
      [SettingsEnum.invoiceDownload]: options.requestInvoiceDownload ?? false,
      [SettingsEnum.responseVersion]: options.responseVersion,
      [SettingsEnum.invoiceExternalId]: options.externalId,
    });
}
