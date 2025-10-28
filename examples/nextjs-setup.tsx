/**
 * Next.js Setup Example
 * Complete setup for Next.js applications
 */

import React from 'react';
import { AppProps } from 'next/app';
import { TranslationProvider } from '@mffl/use-translation';

// Import generated files
import { defaultTranslations } from '../translations/defaultTranslations';
import { translationManifest } from '../translations/translationManifest';

// Define supported languages
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'ja'] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

// App wrapper
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TranslationProvider
      defaultLanguage="en"
      defaultTranslations={defaultTranslations}
      translationManifest={translationManifest}
      isSupportedLanguage={isSupportedLanguage}
      localesPath="/locales"
      localesHashedPath="/locales-hashed"
    >
      <Component {...pageProps} />
    </TranslationProvider>
  );
}

/**
 * Project Structure:
 *
 * project/
 * ├── public/
 * │   ├── locales/
 * │   │   ├── en/
 * │   │   │   ├── common.json
 * │   │   │   └── dashboard.json
 * │   │   ├── es/
 * │   │   └── fr/
 * │   └── locales-hashed/     (auto-generated)
 * ├── src/
 * │   ├── pages/
 * │   │   └── _app.tsx         (this file)
 * │   ├── translations/
 * │   │   ├── defaultTranslations.ts  (auto-generated)
 * │   │   └── translationManifest.ts  (auto-generated)
 * │   └── types/
 * │       └── translations.ts  (auto-generated)
 * ├── scripts/
 * │   ├── generate-translations.js
 * │   └── hash-translations.js
 * └── package.json
 */

/**
 * package.json scripts:
 *
 * {
 *   "scripts": {
 *     "dev": "next dev",
 *     "build": "npm run update:locales && next build",
 *     "update:locales": "npm run generate-translations && npm run hash-translations",
 *     "generate-translations": "node scripts/generate-translations.js",
 *     "hash-translations": "node scripts/hash-translations.js",
 *     "watch:locales": "chokidar \"public/locales/**/*\" -c \"npm run update:locales\""
 *   }
 * }
 */
