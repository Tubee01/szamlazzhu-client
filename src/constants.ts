import { Currency, Language } from './enums';
import { ICurrency, ILanguage, ITaxSubject } from './interfaces';

export const Languages: ILanguage[] = [
  { code: Language.HU, name: 'Hungarian' },
  { code: Language.EN, name: 'English' },
  { code: Language.DE, name: 'German' },
  { code: Language.IT, name: 'Italian' },
  { code: Language.RO, name: 'Romanian' },
  { code: Language.SK, name: 'Slovak' },
  { code: Language.HR, name: 'Croatian' },
  { code: Language.FR, name: 'French' },
  { code: Language.ES, name: 'Spanish' },
  { code: Language.CZ, name: 'Czech' },
  { code: Language.PL, name: 'Polish' },
];

export const TaxSubjects: ITaxSubject[] = [
  { code: 7, name: 'Company outside EU' },
  { code: 6, name: 'Company inside EU' },
  { code: 1, name: 'Has a Hungarian VAT Number' },
  { code: 0, name: 'We dont know' },
  { code: -1, name: 'Has no Hungarian VAT Number' },
];

export const Currencies: ICurrency[] = [
  { code: Currency.Ft, name: 'Hungarian Forint', rounding: 0 },
  { code: Currency.HUF, name: 'Hungarian Forint', rounding: 0 },
  { code: Currency.EUR, name: 'Euro', rounding: 2 },
  { code: Currency.CHF, name: 'Swiss Franc', rounding: 2 },
  { code: Currency.USD, name: 'US Dollar', rounding: 2 },
  { code: Currency.AUD, name: 'Australian Dollar', rounding: 2 },
  { code: Currency.AED, name: 'Emirati Dirham', rounding: 2 },
  { code: Currency.BGN, name: 'Bulgarian Lev', rounding: 2 },
  { code: Currency.CAD, name: 'Canadian Dollar', rounding: 2 },
  { code: Currency.CNY, name: 'Chinese Yuan Renminbi', rounding: 2 },
  { code: Currency.CZK, name: 'Czech Koruna', rounding: 2 },
  { code: Currency.DKK, name: 'Danish Krone', rounding: 2 },
  { code: Currency.GBP, name: 'British Pound', rounding: 2 },
  { code: Currency.HKD, name: 'Hong Kong Dollar', rounding: 2 },
  { code: Currency.HRK, name: 'Croatian Kuna', rounding: 2 },
  { code: Currency.ISK, name: 'Icelandic Krona', rounding: 2 },
  { code: Currency.JPY, name: 'Japanese Yen', rounding: 2 },
  { code: Currency.LTL, name: 'Lithuanian Litas', rounding: 2 },
  { code: Currency.LVL, name: 'Latvian Lats', rounding: 2 },
  { code: Currency.NOK, name: 'Norwegian Krone', rounding: 2 },
  { code: Currency.NZD, name: 'New Zealand Dollar', rounding: 2 },
  { code: Currency.PLN, name: 'Polish Zloty', rounding: 2 },
  { code: Currency.RON, name: 'Romanian Leu', rounding: 2 },
  { code: Currency.SEK, name: 'Swedish Kron', rounding: 2 },
  { code: Currency.SGD, name: 'Singapore Dollar', rounding: 2 },
  { code: Currency.TRY, name: 'Turkish Lira', rounding: 2 },
  { code: Currency.ZAR, name: 'South African Rand', rounding: 2 },
  { code: Currency.RUB, name: 'Russian Ruble', rounding: 2 },
  { code: Currency.UAH, name: 'Ukrainian Hryvnia', rounding: 2 },
];
