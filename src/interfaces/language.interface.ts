import { Language } from '../enums';

export interface ILanguage {
  code: Language;
  name: LanguageName;
}

export type LanguageName =
  | 'Hungarian'
  | 'English'
  | 'German'
  | 'Italian'
  | 'Romanian'
  | 'Slovak'
  | 'Croatian'
  | 'French'
  | 'Spanish'
  | 'Czech'
  | 'Polish';
