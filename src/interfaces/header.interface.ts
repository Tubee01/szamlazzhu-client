import { CurrencyCode } from './currency.interface';
import { LanguageCode } from './language.interface';
import { PaymentMethodCode } from './payment-method.interface';

export interface IHeader {
  completionDate?: string;
  paymentDueDate?: string;
  paymentMethod?: PaymentMethodCode;
  currency?: CurrencyCode;
  language?: LanguageCode;
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
