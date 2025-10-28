/**
 * Configuration for a supported language
 */
export interface LanguageConfig {
  /** ISO 639-1 language code (e.g., 'en', 'es', 'fr') */
  code: string;
  /** English name of the language */
  name: string;
  /** Native name of the language (e.g., 'Español' for Spanish) */
  nativeName: string;
}
