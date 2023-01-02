import { Currency, HeaderEnum as HeadersEnum, Language, PaymentMethod } from '../enums';
import { IHeader } from '../interfaces';
import { Currencies, Languages } from '../constants';
import { Builder } from 'xml2js';
import { omitEmpty } from '../helpers';

export class Header implements IHeader {
  completionDate!: string;
  paymentDueDate!: string;
  paymentMethod!: PaymentMethod;
  currency!: Currency;
  language!: Language;
  type?: string | undefined;
  constructor(options: IHeader) {
    Object.assign(this, validate(options));
  }

  public get getMapped() {
    return map(this);
  }

  public get getXml() {
    return mapToXml(this);
  }
}

const validate = (options: IHeader) => {
  if (options.type === 'SS') {
    return options;
  }

  if (!options.completionDate) {
    throw new Error('SzamlazzAgentClient requires header completionDate');
  }

  if (!options.paymentDueDate) {
    throw new Error('SzamlazzAgentClient requires header paymentDueDate');
  }

  if (!options.paymentMethod) {
    throw new Error('SzamlazzAgentClient requires header paymentMethod');
  }

  if (!options.currency) {
    throw new Error('SzamlazzAgentClient requires header currency');
  }

  if (!Currencies.find((currency) => currency.code === options.currency)) {
    throw new Error(
      `SzamlazzAgentClient requires header currency to be one of ${Currencies.map((currency) => currency.code).join(
        ', ',
      )}`,
    );
  }

  if (!options.language) {
    throw new Error('SzamlazzAgentClient requires header language');
  }

  if (!Languages.find((language) => language.code === options.language)) {
    throw new Error(
      `SzamlazzAgentClient requires header language to be one of ${Languages.map((language) => language.code).join(
        ', ',
      )}`,
    );
  }

  options.completionDate = reconstructDate(options.completionDate);
  options.paymentDueDate = reconstructDate(options.paymentDueDate);

  options.exchangeBank = options.exchangeBank ?? 'MNB';
  options.exchange = options.exchange ?? '0.0';

  return options;
};

const reconstructDate = (date: string) => {
  if (date.length === 10) {
    return date;
  }

  const _date = new Date(date);

  if (isNaN(_date.getTime())) {
    throw new Error(`SzamlazzAgentClient requires dates to be a valid date`);
  }

  const year = _date.getFullYear();
  const month = _date.getMonth() + 1;
  const day = _date.getDate();

  return `${year}-${month}-${day}`;
};

const mapToXml = (options: IHeader) => {
  const builder = new Builder({ rootName: 'fejlec', headless: true });

  return builder.buildObject(map(options));
};

const map = (options: IHeader) =>
  omitEmpty({
    [HeadersEnum.invoiceNumber]: options.invoiceNumber,
    [HeadersEnum.issueDate]: new Date().toISOString().slice(0, 10),
    [HeadersEnum.type]: options.type,
    [HeadersEnum.completionDate]: options.completionDate,
    [HeadersEnum.paymentDueDate]: options.paymentDueDate,
    [HeadersEnum.paymentMethod]: options.paymentMethod,
    [HeadersEnum.currency]: options.currency,
    [HeadersEnum.language]: options.language,
    [HeadersEnum.comment]: options.comment,
    [HeadersEnum.exchangeBank]: options.exchangeBank,
    [HeadersEnum.exchange]: options.exchange,
    [HeadersEnum.orderNumber]: options.orderNumber,
    [HeadersEnum.proformaInvoiceNumber]: options.proformaInvoiceNumber,
    [HeadersEnum.depositInvoice]: options.depositInvoice,
    [HeadersEnum.finalInvoice]: options.finalInvoice,
    [HeadersEnum.correctionInvoice]: options.correctionInvoice,
    [HeadersEnum.correctedInvoiceNumber]: options.correctedInvoiceNumber,
    [HeadersEnum.proformaInvoice]: options.proformaInvoice,
    [HeadersEnum.invoiceNumberPrefix]: options.invoiceNumberPrefix,
    [HeadersEnum.paid]: options.paid,
  });
