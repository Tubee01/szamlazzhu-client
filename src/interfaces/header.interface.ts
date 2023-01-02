import { PaymentMethod, Language, Currency } from '../enums';

export interface IHeader {
  completionDate?: string;
  paymentDueDate?: string;
  paymentMethod?: PaymentMethod;
  currency?: Currency;
  language?: Language;
  comment?: string;
  exchange?: string;
  exchangeBank?: string;
  orderNumber?: string;
  proformaInvoiceNumber?: string;
  depositInvoice?: string;
  finalInvoice?: boolean;
  correctionInvoice?: boolean;
  correctedInvoiceNumber?: string;
  proformaInvoice?: boolean;
  invoiceNumberPrefix?: string;
  paid?: boolean;
  invoiceNumber?: string;
  type?: string | undefined;
}
