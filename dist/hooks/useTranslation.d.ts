import { TranslationKey, TranslationNamespace } from '../types/translations';
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
export declare const useTranslation: <N extends TranslationNamespace[]>(namespaces?: N) => {
    t: <TNamespace extends N[number] = N[0]>(key: TranslationKey<TNamespace>, namespace?: TNamespace) => string;
    language: import("../types/translations").SupportedLanguage;
    setLanguage: (lang: import("../types/translations").SupportedLanguage) => void;
    isLoading: boolean;
};
//# sourceMappingURL=useTranslation.d.ts.map