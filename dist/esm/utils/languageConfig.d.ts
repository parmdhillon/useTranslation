import { LanguageConfig } from '../types/languages';
/**
 * Creates a language configuration helper
 *
 * @param languages - Array of supported language configurations
 * @param defaultLanguage - Default language code
 * @returns Helper functions for language management
 *
 * @example
 * ```typescript
 * const { isSupportedLanguage, getLanguageByCode } = createLanguageConfig(
 *   [
 *     { code: 'en', name: 'English', nativeName: 'English' },
 *     { code: 'es', name: 'Spanish', nativeName: 'Español' },
 *   ],
 *   'en'
 * );
 * ```
 */
export declare function createLanguageConfig<T extends string>(languages: readonly LanguageConfig[], defaultLanguage: T): {
    languages: readonly LanguageConfig[];
    defaultLanguage: T;
    isSupportedLanguage: (lang: string) => lang is string;
    getSupportedLanguageCodes: () => string[];
    getLanguageByCode: (code: string) => LanguageConfig | undefined;
    getDefaultLanguage: () => T;
};
/**
 * Common language configurations
 * Use these as a starting point or reference
 */
export declare const COMMON_LANGUAGES: LanguageConfig[];
//# sourceMappingURL=languageConfig.d.ts.map