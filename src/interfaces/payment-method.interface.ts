import { PaymentMethod } from '../enums';

export interface IPaymentMethod {
  code: PaymentMethod;
  name: PaymentMethodName;
}

export type PaymentMethodName = 'Bank' | 'Cash' | 'Card' | 'PayPal';
