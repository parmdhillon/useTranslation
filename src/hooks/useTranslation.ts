import { useContext, useEffect, useMemo } from 'react';
import { TranslationContext } from '../contexts/TranslationContext';
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
export const useTranslation = <N extends TranslationNamespace[]>(
  namespaces: N = ['common'] as any
) => {
  const context = useContext(TranslationContext);

  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }

  const { t: translate, loadNamespaces, ...rest } = context;

  // Ensure all requested namespaces are loaded
  useEffect(() => {
    loadNamespaces(namespaces);
  }, [namespaces, loadNamespaces]);

  // Create a wrapper for the t function that defaults to the first namespace
  const t = useMemo(
    () =>
      <TNamespace extends N[number] = N[0]>(
        key: TranslationKey<TNamespace>,
        namespace?: TNamespace
      ) => {
        // Always explicitly pass the namespace to the translate function
        // This ensures the correct namespace is used regardless of the order
        const nsToUse = namespace || namespaces[0];
        return translate(key, nsToUse);
      },
    [translate, namespaces]
  );

  return { ...rest, t };
};
