import { ICurrency } from './interfaces';
import { ILanguage } from './interfaces/language.interface';
import { IPaymentMethod } from './interfaces/payment-method.interface';
import { ITaxSubject } from './interfaces/tax-subject.interface';

export const Languages: ILanguage[] = [
  { code: 'hu', name: 'Hungarian' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'sk', name: 'Slovak' },
  { code: 'hr', name: 'Croatian' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'cz', name: 'Czech' },
  { code: 'pl', name: 'Polish' },
];

export const TaxSubjects: ITaxSubject[] = [
  { code: 7, name: 'Company outside EU' },
  { code: 6, name: 'Company inside EU' },
  { code: 1, name: 'Has a Hungarian VAT Number' },
  { code: 0, name: 'We dont know' },
  { code: -1, name: 'Has no Hungarian VAT Number' },
];

export const PaymentMethods: IPaymentMethod[] = [
  { code: 'bank transfer', name: 'Bank' },
  { code: 'cash', name: 'Cash' },
  { code: 'credit card', name: 'Card' },
  { code: 'PayPal', name: 'PayPal' },
];

export const Currencies: ICurrency[] = [
  { code: 'Ft', name: 'Hungarian Forint', rounding: 0 },
  { code: 'HUF', name: 'Hungarian Forint', rounding: 0 },
  { code: 'EUR', name: 'Euro', rounding: 2 },
  { code: 'CHF', name: 'Swiss Franc', rounding: 2 },
  { code: 'USD', name: 'US Dollar', rounding: 2 },
  { code: 'AUD', name: 'Australian Dollar', rounding: 2 },
  { code: 'AED', name: 'Emirati Dirham', rounding: 2 },
  { code: 'BGN', name: 'Bulgarian Lev', rounding: 2 },
  { code: 'CAD', name: 'Canadian Dollar', rounding: 2 },
  { code: 'CNY', name: 'Chinese Yuan Renminbi', rounding: 2 },
  { code: 'CZK', name: 'Czech Koruna', rounding: 2 },
  { code: 'DKK', name: 'Danish Krone', rounding: 2 },
  { code: 'GBP', name: 'British Pound', rounding: 2 },
  { code: 'HKD', name: 'Hong Kong Dollar', rounding: 2 },
  { code: 'HRK', name: 'Croatian Kuna', rounding: 2 },
  { code: 'ISK', name: 'Icelandic Krona', rounding: 2 },
  { code: 'JPY', name: 'Japanese Yen', rounding: 2 },
  { code: 'LTL', name: 'Lithuanian Litas', rounding: 2 },
  { code: 'LVL', name: 'Latvian Lats', rounding: 2 },
  { code: 'NOK', name: 'Norwegian Krone', rounding: 2 },
  { code: 'NZD', name: 'New Zealand Dollar', rounding: 2 },
  { code: 'PLN', name: 'Polish Zloty', rounding: 2 },
  { code: 'RON', name: 'Romanian Leu', rounding: 2 },
  { code: 'SEK', name: 'Swedish Kron', rounding: 2 },
  { code: 'SGD', name: 'Singapore Dollar', rounding: 2 },
  { code: 'TRY', name: 'Turkish Lira', rounding: 2 },
  { code: 'ZAR', name: 'South African Rand', rounding: 2 },
  { code: 'RUB', name: 'Russian Ruble', rounding: 2 },
  { code: 'UAH', name: 'Ukrainian Hryvnia', rounding: 2 },
];
