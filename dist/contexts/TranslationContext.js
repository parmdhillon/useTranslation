"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationProvider = exports.TranslationContext = void 0;
const react_1 = __importStar(require("react"));
exports.TranslationContext = (0, react_1.createContext)(undefined);
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
const TranslationProvider = ({ children, defaultLanguage, defaultTranslations, translationManifest, isSupportedLanguage, localesPath = '/locales', localesHashedPath = '/locales-hashed', }) => {
    // Initialize language from localStorage if available, otherwise use default
    const getInitialLanguage = () => {
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('language');
            if (savedLanguage && isSupportedLanguage(savedLanguage)) {
                return savedLanguage;
            }
        }
        return defaultLanguage;
    };
    const [language, setLanguage] = (0, react_1.useState)(getInitialLanguage);
    const [translations, setTranslations] = (0, react_1.useState)(defaultTranslations);
    const [loadedNamespaces, setLoadedNamespaces] = (0, react_1.useState)(new Set(Object.keys(defaultTranslations)));
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    // Save language selection to localStorage whenever it changes
    (0, react_1.useEffect)(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', language);
        }
    }, [language]);
    // Helper function to load translations for specified namespaces
    const loadTranslationsForNamespaces = (0, react_1.useCallback)(async (namespacesToLoad) => {
        if (language === defaultLanguage) {
            // For default language, we already have all translations loaded
            return;
        }
        setIsLoading(true);
        try {
            const newTranslations = {};
            for (const namespace of namespacesToLoad) {
                let url = `${localesPath}/${language}/${namespace}.json`; // Default fallback
                // Use the pre-built manifest to get the hashed filename
                const manifestKey = `${language}/${namespace}`;
                const hashedFilename = translationManifest[manifestKey];
                if (hashedFilename) {
                    url = `${localesHashedPath}/${hashedFilename}`;
                }
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        const data = await response.json();
                        newTranslations[namespace] = data;
                    }
                    else {
                        // Fallback to default language if translation not found
                        newTranslations[namespace] =
                            defaultTranslations[namespace];
                    }
                }
                catch (fetchError) {
                    console.error(`Failed to load translation for ${namespace}:`, fetchError);
                    // Fallback to default language
                    newTranslations[namespace] =
                        defaultTranslations[namespace];
                }
            }
            setTranslations((prev) => ({ ...prev, ...newTranslations }));
        }
        catch (error) {
            console.error('Failed to load translations:', error);
        }
        finally {
            setIsLoading(false);
        }
    }, [
        language,
        defaultLanguage,
        translationManifest,
        localesPath,
        localesHashedPath,
        defaultTranslations,
    ]);
    // External function to request loading of namespaces
    const loadNamespaces = (0, react_1.useCallback)((namespaces) => {
        const newNamespaces = namespaces.filter((ns) => !loadedNamespaces.has(ns));
        if (newNamespaces.length > 0) {
            setLoadedNamespaces((prev) => new Set([...prev, ...newNamespaces]));
            loadTranslationsForNamespaces(newNamespaces);
        }
    }, [loadedNamespaces, loadTranslationsForNamespaces]);
    // Load translations when language or namespaces change
    (0, react_1.useEffect)(() => {
        // If we're using default language, use the default translations
        if (language === defaultLanguage) {
            setTranslations(defaultTranslations);
            return;
        }
        // For other languages, load translations for all currently tracked namespaces
        const namespacesToLoad = Array.from(loadedNamespaces);
        loadTranslationsForNamespaces(namespacesToLoad);
    }, [language, defaultLanguage, loadTranslationsForNamespaces, defaultTranslations]);
    // Get translation by key
    const t = (0, react_1.useMemo)(() => (key, namespace = 'common') => {
        try {
            // Ensure the namespace is loaded
            if (!loadedNamespaces.has(namespace)) {
                // Add to set of namespaces that need loading
                setLoadedNamespaces((prev) => new Set([...prev, namespace]));
                // For immediate loading, though the effect will handle it later
                if (language !== defaultLanguage) {
                    loadTranslationsForNamespaces([namespace]);
                }
            }
            // Get the translation value using the key path (e.g. "site.title")
            const keyPath = key.split('.');
            let value = translations[namespace];
            // If the namespace isn't available in translations yet, try defaultTranslations
            if (!value && defaultTranslations[namespace]) {
                value = defaultTranslations[namespace];
            }
            for (const k of keyPath) {
                if (value === undefined)
                    return key;
                value = value[k];
            }
            return typeof value === 'string' ? value : key;
        }
        catch (_error) {
            console.error(`Translation key not found: ${namespace}:${key}`);
            return key;
        }
    }, [translations, loadedNamespaces, language, defaultLanguage, loadTranslationsForNamespaces, defaultTranslations]);
    const contextValue = (0, react_1.useMemo)(() => ({
        language,
        setLanguage,
        t,
        isLoading,
        loadNamespaces,
    }), [language, t, isLoading, loadNamespaces]);
    return (react_1.default.createElement(exports.TranslationContext.Provider, { value: contextValue }, children));
};
exports.TranslationProvider = TranslationProvider;
