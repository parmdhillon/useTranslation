"use strict";
/**
 * Helper utilities for working with translations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolate = interpolate;
exports.formatPlural = formatPlural;
exports.formatNumber = formatNumber;
exports.formatDate = formatDate;
exports.formatRelativeTime = formatRelativeTime;
exports.escapeHtml = escapeHtml;
exports.hasTranslationKey = hasTranslationKey;
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
function interpolate(text, variables) {
    return Object.entries(variables).reduce((result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, 'g'), String(value)), text);
}
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
function formatPlural(count, one, other) {
    if (count === 1) {
        return one;
    }
    return other.replace(/{{count}}/g, String(count));
}
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
function formatNumber(value, locale, options) {
    return new Intl.NumberFormat(locale, options).format(value);
}
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
function formatDate(date, locale, options) {
    return new Intl.DateTimeFormat(locale, options).format(date);
}
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
function formatRelativeTime(date, locale, baseDate = new Date()) {
    const diffInSeconds = Math.floor((baseDate.getTime() - date.getTime()) / 1000);
    const units = [
        ['year', 31536000],
        ['month', 2592000],
        ['week', 604800],
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
        ['second', 1],
    ];
    for (const [unit, secondsInUnit] of units) {
        const value = Math.floor(Math.abs(diffInSeconds) / secondsInUnit);
        if (value >= 1) {
            const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
            return rtf.format(diffInSeconds < 0 ? value : -value, unit);
        }
    }
    return 'just now';
}
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
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
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
function hasTranslationKey(translations, namespace, key) {
    try {
        const keyPath = key.split('.');
        let value = translations[namespace];
        for (const k of keyPath) {
            if (value === undefined)
                return false;
            value = value[k];
        }
        return typeof value === 'string';
    }
    catch {
        return false;
    }
}
