"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTranslation = void 0;
const react_1 = require("react");
const TranslationContext_1 = require("../contexts/TranslationContext");
/**
 * Hook for accessing translations in React components
 *
 * @param namespaces - Array of namespaces to load. Defaults to ['common']
 * @returns Translation function and utilities
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { t } = useTranslation(['common']);
 *   return <div>{t('nav.back')}</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Multiple namespaces
 * function MyComponent() {
 *   const { t } = useTranslation(['common', 'user']);
 *   return (
 *     <div>
 *       {t('nav.back', 'common')}
 *       {t('home.title', 'user')}
 *     </div>
 *   );
 * }
 * ```
 */
const useTranslation = (namespaces = ['common']) => {
    const context = (0, react_1.useContext)(TranslationContext_1.TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    const { t: translate, loadNamespaces, ...rest } = context;
    // Ensure all requested namespaces are loaded
    (0, react_1.useEffect)(() => {
        loadNamespaces(namespaces);
    }, [namespaces, loadNamespaces]);
    // Create a wrapper for the t function that defaults to the first namespace
    const t = (0, react_1.useMemo)(() => (key, namespace) => {
        // Always explicitly pass the namespace to the translate function
        // This ensures the correct namespace is used regardless of the order
        const nsToUse = namespace || namespaces[0];
        return translate(key, nsToUse);
    }, [translate, namespaces]);
    return { ...rest, t };
};
exports.useTranslation = useTranslation;
