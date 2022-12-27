import { Builder } from 'xml2js';
import { Currencies } from '../constants';
import { IInvoice, ReverseInvoiceOptions } from '../interfaces';
import { Buyer } from './buyer';
import { Header } from './header';
import { Item } from './item';
import { Seller } from './seller';

export class Invoice {
  public static getInvoiceXML(options: IInvoice): string {
    const { items, header } = options;
    const rounding =
      Currencies.find((currency) => {
        return currency.code === header.currency;
      })?.rounding ?? 2;

    const _items = items.map((item) => new Item(item, rounding));
    const itemsXml = this.itemsBuilder(_items);

    const xml = `
  ${new Header(options?.header).getXml}
  ${new Seller(options?.seller).getXml}
  ${new Buyer(options?.buyer).getXml}
  ${itemsXml}`;

    return xml;
  }

  public static getReverseInvoiceXML(options: ReverseInvoiceOptions): string {
    const { seller, invoiceNumber } = options;
    const xml = `
  ${new Header({ invoiceNumber, type: 'SS' }).getXml}
  ${seller ? new Seller(seller).getXml : ''}`;

    return xml;
  }

  private static itemsBuilder = (items: Item[]) => {
    const builder = new Builder({ headless: true, rootName: 'tetelek' });
    const xml = builder.buildObject(
      items.map((item) => ({
        tetel: item.getMapped,
      })),
    );

    return xml;
  };
}
