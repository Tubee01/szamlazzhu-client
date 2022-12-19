export interface IPaymentMethod {
  code: PaymentMethodCode;
  name: PaymentMethodName;
}

export type PaymentMethodCode = 'bank transfer' | 'cash' | 'credit card' | 'PayPal';

export type PaymentMethodName = 'Bank' | 'Cash' | 'Card' | 'PayPal';
