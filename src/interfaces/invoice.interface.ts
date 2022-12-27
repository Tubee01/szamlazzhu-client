import { Currency, Language, PaymentMethod } from '../enums';
import { IBuyer } from './buyer.interface';
import { IHeader } from './header.interface';
import { IItem } from './item.interface';
import { ISeller } from './seller.interface';

export interface IInvoiceHeader extends Exclude<IHeader, ['invoiceNumber', 'type']> {
  completionDate: string;
  paymentDueDate: string;
  paymentMethod: PaymentMethod;
  currency: Currency;
  language: Language;
}

export interface IInvoice {
  header: IInvoiceHeader;
  buyer: IBuyer;
  items: IItem[];
  seller: ISeller;
}
