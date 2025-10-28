# Setup Guide

Complete guide for setting up @mffl/use-translation in your project.

## Installation

```bash
npm install @mffl/use-translation
# or
yarn add @mffl/use-translation
# or
pnpm add @mffl/use-translation
```

## Project Structure

Set up your project with the following structure:

```
your-project/
├── public/
│   └── locales/
│       ├── en/
│       │   ├── common.json
│       │   └── [namespace].json
│       └── [lang]/
│           └── ...
├── src/
│   ├── translations/          (auto-generated)
│   │   ├── defaultTranslations.ts
│   │   └── translationManifest.ts
│   └── types/                 (auto-generated)
│       └── translations.ts
└── scripts/
    ├── generate-translations.js
    └── hash-translations.js
```

## Step 1: Create Translation Files

Create your translation files in `public/locales/`:

**`public/locales/en/common.json`**

```json
{
  "nav": {
    "back": "Back",
    "home": "Home",
    "settings": "Settings"
  },
  "language": {
    "select": "Select Language"
  },
  "loading": "Loading..."
}
```

**`public/locales/en/dashboard.json`**

```json
{
  "title": "Dashboard",
  "welcome": "Welcome, {{name}}!",
  "stats": {
    "users": "Total Users",
    "revenue": "Revenue"
  }
}
```

## Step 2: Create Generation Scripts

**`scripts/generate-translations.js`**

```javascript
const path = require('path');
const {
  generateTranslationTypes,
  generateDefaultTranslations,
} = require('@mffl/use-translation/scripts');

const localesDir = path.resolve(process.cwd(), 'public/locales/en');
const typesOutput = path.resolve(process.cwd(), 'src/types/translations.ts');
const defaultTransOutput = path.resolve(
  process.cwd(),
  'src/translations/defaultTranslations.ts'
);

generateTranslationTypes(localesDir, typesOutput);
generateDefaultTranslations(localesDir, defaultTransOutput);
```

**`scripts/hash-translations.js`**

```javascript
const path = require('path');
const { hashTranslations } = require('@mffl/use-translation/scripts');

const localesDir = path.resolve(process.cwd(), 'public/locales');
const hashedDir = path.resolve(process.cwd(), 'public/locales-hashed');
const manifestPath = path.resolve(hashedDir, 'manifest.json');
const tsManifestPath = path.resolve(
  process.cwd(),
  'src/translations/translationManifest.ts'
);

hashTranslations(localesDir, hashedDir, manifestPath, tsManifestPath);
```

## Step 3: Update package.json

Add scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "npm run update:locales && next build",
    "update:locales": "npm run generate-translations && npm run hash-translations",
    "generate-translations": "node scripts/generate-translations.js",
    "hash-translations": "node scripts/hash-translations.js",
    "watch:locales": "chokidar \"public/locales/**/*\" -c \"npm run update:locales\""
  },
  "devDependencies": {
    "chokidar-cli": "^3.0.0"
  }
}
```

## Step 4: Generate Types

Run the generation scripts:

```bash
npm run update:locales
```

This creates:

- `src/types/translations.ts` - TypeScript type definitions
- `src/translations/defaultTranslations.ts` - Default English translations
- `src/translations/translationManifest.ts` - Hash manifest
- `public/locales-hashed/` - Hashed translation files

## Step 5: Setup Provider

Wrap your app with the `TranslationProvider`:

**Next.js (`pages/_app.tsx`)**

```tsx
import type { AppProps } from 'next/app';
import { TranslationProvider } from '@mffl/use-translation';
import { defaultTranslations } from '@/translations/defaultTranslations';
import { translationManifest } from '@/translations/translationManifest';

const SUPPORTED_LANGUAGES = ['en', 'es', 'fr'] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TranslationProvider
      defaultLanguage="en"
      defaultTranslations={defaultTranslations}
      translationManifest={translationManifest}
      isSupportedLanguage={isSupportedLanguage}
    >
      <Component {...pageProps} />
    </TranslationProvider>
  );
}
```

**React (Vite, CRA, etc.)**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { TranslationProvider } from '@mffl/use-translation';
import { defaultTranslations } from './translations/defaultTranslations';
import { translationManifest } from './translations/translationManifest';
import App from './App';

const SUPPORTED_LANGUAGES = ['en', 'es', 'fr'] as const;

function isSupportedLanguage(
  lang: string
): lang is (typeof SUPPORTED_LANGUAGES)[number] {
  return SUPPORTED_LANGUAGES.includes(lang as any);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TranslationProvider
      defaultLanguage="en"
      defaultTranslations={defaultTranslations}
      translationManifest={translationManifest}
      isSupportedLanguage={isSupportedLanguage}
    >
      <App />
    </TranslationProvider>
  </React.StrictMode>
);
```

## Step 6: Use in Components

Now you can use translations in your components:

```tsx
import { useTranslation } from '@mffl/use-translation';

export default function MyComponent() {
  const { t } = useTranslation(['common']);

  return (
    <div>
      <button>{t('nav.back')}</button>
      <p>{t('loading')}</p>
    </div>
  );
}
```

## Development Workflow

### During Development

Run the watch script to auto-regenerate on changes:

```bash
npm run watch:locales
```

This watches `public/locales/` and regenerates types when files change.

### Before Building

Always regenerate before building:

```bash
npm run update:locales
npm run build
```

The `build` script already includes `update:locales` if configured as shown above.

## TypeScript Configuration

Ensure your `tsconfig.json` includes the generated types:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "src/types/**/*", "src/translations/**/*"]
}
```

## Git Configuration

Add to `.gitignore`:

```gitignore
# Optional - you can commit generated files for CI/CD
# src/types/translations.ts
# src/translations/defaultTranslations.ts
# src/translations/translationManifest.ts
# public/locales-hashed/
```

**Recommendation**: Commit generated files for CI/CD compatibility.

## Troubleshooting

### Types Not Found

If TypeScript can't find types:

1. Run `npm run generate-translations`
2. Restart TypeScript server: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
3. Check `tsconfig.json` includes generated files

### Translations Not Loading

If translations show as keys:

1. Check translation files exist in `public/locales/[lang]/`
2. Run `npm run hash-translations`
3. Check browser console for 404 errors
4. Verify manifest is up to date

### Build Errors

If build fails:

1. Ensure all JSON files are valid
2. Run scripts individually to identify issue:
   ```bash
   npm run generate-translations
   npm run hash-translations
   ```
3. Check file permissions

## Next Steps

- [API Reference](./API.md) - Complete API documentation
- [Examples](../examples/) - Code examples
- [Best Practices](./BEST_PRACTICES.md) - Tips and recommendations

## Support

Need help? [Open an issue](https://github.com/parmdhillon/mffl-quiz/issues) on GitHub.
