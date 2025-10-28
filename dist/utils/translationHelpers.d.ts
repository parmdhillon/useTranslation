/**
 * Helper utilities for working with translations
 */
/**
 * Interpolates variables in a translation string
 *
 * @param text - Translation text with {{variable}} placeholders
 * @param variables - Object with variable values
 * @returns Interpolated string
 *
 * @example
 * ```typescript
 * interpolate('Hello, {{name}}!', { name: 'John' })
 * // => 'Hello, John!'
 *
 * interpolate('{{count}} items in cart', { count: 5 })
 * // => '5 items in cart'
 * ```
 */
export declare function interpolate(text: string, variables: Record<string, string | number>): string;
/**
 * Formats a string based on plural rules
 *
 * @param count - Number to check
 * @param one - Singular form
 * @param other - Plural form (can include {{count}} placeholder)
 * @returns Formatted string
 *
 * @example
 * ```typescript
 * formatPlural(1, 'item', '{{count}} items')
 * // => 'item'
 *
 * formatPlural(5, 'item', '{{count}} items')
 * // => '5 items'
 * ```
 */
export declare function formatPlural(count: number, one: string, other: string): string;
/**
 * Formats a number based on locale
 *
 * @param value - Number to format
 * @param locale - Locale code (e.g., 'en-US', 'de-DE')
 * @param options - Intl.NumberFormatOptions
 * @returns Formatted number string
 *
 * @example
 * ```typescript
 * formatNumber(1234.56, 'en-US')
 * // => '1,234.56'
 *
 * formatNumber(1234.56, 'de-DE')
 * // => '1.234,56'
 * ```
 */
export declare function formatNumber(value: number, locale: string, options?: Intl.NumberFormatOptions): string;
/**
 * Formats a date based on locale
 *
 * @param date - Date to format
 * @param locale - Locale code
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 *
 * @example
 * ```typescript
 * formatDate(new Date(), 'en-US', { dateStyle: 'long' })
 * // => 'January 15, 2025'
 *
 * formatDate(new Date(), 'de-DE', { dateStyle: 'long' })
 * // => '15. Januar 2025'
 * ```
 */
export declare function formatDate(date: Date, locale: string, options?: Intl.DateTimeFormatOptions): string;
/**
 * Formats a relative time (e.g., "2 days ago")
 *
 * @param date - Date to compare
 * @param locale - Locale code
 * @param baseDate - Base date for comparison (defaults to now)
 * @returns Formatted relative time string
 *
 * @example
 * ```typescript
 * const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
 * formatRelativeTime(twoDaysAgo, 'en')
 * // => '2 days ago'
 * ```
 */
export declare function formatRelativeTime(date: Date, locale: string, baseDate?: Date): string;
/**
 * Escapes HTML in a string
 *
 * @param text - Text to escape
 * @returns HTML-safe string
 *
 * @example
 * ```typescript
 * escapeHtml('<script>alert("xss")</script>')
 * // => '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 * ```
 */
export declare function escapeHtml(text: string): string;
/**
 * Checks if a translation key exists in a translations object
 *
 * @param translations - Translations object
 * @param namespace - Namespace
 * @param key - Dot-notation key
 * @returns True if key exists
 *
 * @example
 * ```typescript
 * hasTranslationKey(translations, 'common', 'nav.back')
 * // => true or false
 * ```
 */
export declare function hasTranslationKey(translations: any, namespace: string, key: string): boolean;
//# sourceMappingURL=translationHelpers.d.ts.map