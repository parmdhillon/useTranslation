/**
 * @mffl/use-translation
 *
 * A fully type-safe, zero-dependency internationalization library for Next.js static exports
 */
// Main exports
export { useTranslation } from './hooks/useTranslation';
export { TranslationProvider, TranslationContext, } from './contexts/TranslationContext';
// Utility exports
export { createLanguageConfig } from './utils/languageConfig';
export { interpolate, formatPlural } from './utils/translationHelpers';
