import { Currency } from '../enums';

export interface ICurrency {
  code: Currency;
  name: string;
  rounding: Rounding;
}

export type Rounding = 0 | 2;
