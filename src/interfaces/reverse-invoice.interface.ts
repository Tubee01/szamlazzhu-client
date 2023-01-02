import { IBuyer } from './buyer.interface';
import { ISeller } from './seller.interface';

export interface ReverseInvoiceOptions {
  seller?: Exclude<ISeller, ['bank', 'accountNumber']>;
  invoiceNumber: string;
  buyer?: Pick<IBuyer, 'email'>;
}
