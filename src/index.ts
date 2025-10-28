/**
 * @mffl/use-translation
 *
 * A fully type-safe, zero-dependency internationalization library for Next.js static exports
 */

// Main exports
export { useTranslation } from './hooks/useTranslation';
export {
  TranslationProvider,
  TranslationContext,
  type TranslationContextType,
  type TranslationProviderProps,
} from './contexts/TranslationContext';

// Type exports
export type {
  LanguageConfig,
} from './types/languages';

export type {
  SupportedLanguage,
  TranslationNamespace,
  Translations,
  TranslationKey,
  TranslationKeys,
} from './types/translations';

// Utility exports
export { createLanguageConfig } from './utils/languageConfig';
export { interpolate, formatPlural } from './utils/translationHelpers';
