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
export function createLanguageConfig<T extends string>(
  languages: readonly LanguageConfig[],
  defaultLanguage: T
) {
  type SupportedLanguageCode = (typeof languages)[number]['code'];

  /**
   * Check if a language code is supported
   */
  const isSupportedLanguage = (
    lang: string
  ): lang is SupportedLanguageCode => {
    return languages.some((l) => l.code === lang);
  };

  /**
   * Get all supported language codes
   */
  const getSupportedLanguageCodes = (): SupportedLanguageCode[] => {
    return languages.map((lang) => lang.code) as SupportedLanguageCode[];
  };

  /**
   * Get language configuration by code
   */
  const getLanguageByCode = (code: string): LanguageConfig | undefined => {
    return languages.find((lang) => lang.code === code);
  };

  /**
   * Get the default language code
   */
  const getDefaultLanguage = (): T => {
    return defaultLanguage;
  };

  return {
    languages,
    defaultLanguage,
    isSupportedLanguage,
    getSupportedLanguageCodes,
    getLanguageByCode,
    getDefaultLanguage,
  };
}

/**
 * Common language configurations
 * Use these as a starting point or reference
 */
export const COMMON_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
];
