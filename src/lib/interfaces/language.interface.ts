export interface ILanguage {
  code: LanguageCode;
  name: LanguageName;
}

export type LanguageCode = 'hu' | 'en' | 'de' | 'it' | 'ro' | 'sk' | 'hr' | 'fr' | 'es' | 'cz' | 'pl';

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
