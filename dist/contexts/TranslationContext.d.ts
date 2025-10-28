import React, { ReactNode } from 'react';
import { SupportedLanguage, TranslationKey, TranslationNamespace, Translations } from '../types/translations';
export interface TranslationContextType {
    language: SupportedLanguage;
    setLanguage: (lang: SupportedLanguage) => void;
    t: <N extends TranslationNamespace>(key: TranslationKey<N>, namespace?: N) => string;
    isLoading: boolean;
    loadNamespaces: (namespaces: TranslationNamespace[]) => void;
}
export declare const TranslationContext: React.Context<TranslationContextType | undefined>;
export interface TranslationProviderProps {
    children: ReactNode;
    defaultLanguage: SupportedLanguage;
    defaultTranslations: Translations;
    translationManifest: Record<string, string>;
    isSupportedLanguage: (lang: string) => lang is SupportedLanguage;
    localesPath?: string;
    localesHashedPath?: string;
}
/**
 * Provider component for the translation system
 *
 * @example
 * ```tsx
 * import { TranslationProvider } from '@mffl/use-translation';
 * import { defaultTranslations } from './translations/defaultTranslations';
 * import { translationManifest } from './translations/translationManifest';
 *
 * function App({ children }) {
 *   return (
 *     <TranslationProvider
 *       defaultLanguage="en"
 *       defaultTranslations={defaultTranslations}
 *       translationManifest={translationManifest}
 *       isSupportedLanguage={(lang) => ['en', 'es', 'fr'].includes(lang)}
 *     >
 *       {children}
 *     </TranslationProvider>
 *   );
 * }
 * ```
 */
export declare const TranslationProvider: React.FC<TranslationProviderProps>;
//# sourceMappingURL=TranslationContext.d.ts.map