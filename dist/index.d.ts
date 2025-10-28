/**
 * @mffl/use-translation
 *
 * A fully type-safe, zero-dependency internationalization library for Next.js static exports
 */
export { useTranslation } from './hooks/useTranslation';
export { TranslationProvider, TranslationContext, type TranslationContextType, type TranslationProviderProps, } from './contexts/TranslationContext';
export type { LanguageConfig, } from './types/languages';
export type { SupportedLanguage, TranslationNamespace, Translations, TranslationKey, TranslationKeys, } from './types/translations';
export { createLanguageConfig } from './utils/languageConfig';
export { interpolate, formatPlural } from './utils/translationHelpers';
//# sourceMappingURL=index.d.ts.map