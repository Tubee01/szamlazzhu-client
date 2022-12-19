export interface ITaxSubject {
  code: TaxSubjectCode;
  name: TaxSubjectName;
}

export type TaxSubjectCode = 7 | 6 | 1 | 0 | -1;

export type TaxSubjectName =
  | 'Company outside EU'
  | 'Company inside EU'
  | 'Has a Hungarian VAT Number'
  | 'We dont know'
  | 'Has no Hungarian VAT Number';
