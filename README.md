# @mffl/use-translation

<div align="center">

A fully type-safe, zero-dependency internationalization (i18n) library designed specifically for Next.js static exports.

[![npm version](https://img.shields.io/npm/v/@mffl/use-translation.svg)](https://www.npmjs.com/package/@mffl/use-translation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

[Features](#features) • [Installation](#installation) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Examples](#examples)

</div>

---

## Why This Library?

Most i18n libraries don't work well with Next.js static exports. This library was built from the ground up to solve that problem with:

- ✅ **Full Static Export Support** - No server required
- ✅ **Complete Type Safety** - Autocomplete for all translation keys
- ✅ **Zero Dependencies** - Lightweight and fast
- ✅ **Automatic Type Generation** - Types sync automatically with translations
- ✅ **Content-Based Hashing** - Optimal caching with automatic invalidation
- ✅ **Lazy Loading** - Load only the translations you need
- ✅ **Framework Agnostic** - Works with React, Preact, and Next.js

## Features

### Type Safety

Full TypeScript support with automatic type generation from your translation files.

```typescript
// ✅ Autocomplete works
t('nav.back');

// ❌ TypeScript error - key doesn't exist
t('nav.nonexistent');
```

### Namespace Support

Organize translations by feature for better code splitting:

```typescript
const { t } = useTranslation(['common', 'dashboard']);
```

### Content-Based Hashing

Automatic cache invalidation when translations change:

```
common.json → common.a1b2c3d4.json
```

### Zero Runtime Dependencies

No bloated dependencies - just pure, optimized code.

## Installation

```bash
npm install @mffl/use-translation
# or
yarn add @mffl/use-translation
# or
pnpm add @mffl/use-translation
```

## Quick Start

### 1. Setup Your Translation Files

Create translation files in `public/locales/`:

```
public/
└── locales/
    ├── en/
    │   ├── common.json
    │   └── dashboard.json
    └── es/
        ├── common.json
        └── dashboard.json
```

**Example: `public/locales/en/common.json`**

```json
{
  "nav": {
    "back": "Back",
    "home": "Home"
  },
  "greeting": "Hello, {{name}}!"
}
```

### 2. Generate Types

Create a script to generate types:

```javascript
// scripts/generate-translations.js
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

Add to `package.json`:

```json
{
  "scripts": {
    "generate-translations": "node scripts/generate-translations.js"
  }
}
```

Run it:

```bash
npm run generate-translations
```

### 3. Setup Provider

Wrap your app with the `TranslationProvider`:

```tsx
// pages/_app.tsx
import { TranslationProvider } from '@mffl/use-translation';
import { defaultTranslations } from '@/translations/defaultTranslations';
import { translationManifest } from '@/translations/translationManifest';

const SUPPORTED_LANGUAGES = ['en', 'es', 'fr'];

function MyApp({ Component, pageProps }) {
  return (
    <TranslationProvider
      defaultLanguage="en"
      defaultTranslations={defaultTranslations}
      translationManifest={translationManifest}
      isSupportedLanguage={(lang) => SUPPORTED_LANGUAGES.includes(lang)}
    >
      <Component {...pageProps} />
    </TranslationProvider>
  );
}

export default MyApp;
```

### 4. Use in Components

```tsx
import { useTranslation } from '@mffl/use-translation';

export default function MyComponent() {
  const { t, language, setLanguage } = useTranslation(['common']);

  return (
    <div>
      <button onClick={() => setLanguage('es')}>Switch to Spanish</button>
      <p>{t('nav.back')}</p>
      <p>{t('greeting').replace('{{name}}', 'John')}</p>
    </div>
  );
}
```

## API Reference

### `useTranslation`

Hook for accessing translations.

```typescript
const { t, language, setLanguage, isLoading } = useTranslation(['common']);
```

**Parameters:**

- `namespaces`: Array of namespaces to load (default: `['common']`)

**Returns:**

- `t(key, namespace?)`: Translation function
- `language`: Current language code
- `setLanguage(lang)`: Function to change language
- `isLoading`: Loading state

### `TranslationProvider`

Provider component that wraps your app.

```typescript
<TranslationProvider
  defaultLanguage="en"
  defaultTranslations={defaultTranslations}
  translationManifest={translationManifest}
  isSupportedLanguage={(lang) => boolean}
  localesPath="/locales" // optional
  localesHashedPath="/locales-hashed" // optional
>
  {children}
</TranslationProvider>
```

### Utility Functions

#### `interpolate`

Replace variables in translations:

```typescript
import { interpolate } from '@mffl/use-translation';

interpolate('Hello, {{name}}!', { name: 'John' });
// => 'Hello, John!'
```

#### `formatPlural`

Handle pluralization:

```typescript
import { formatPlural } from '@mffl/use-translation';

formatPlural(1, 'item', '{{count}} items');
// => 'item'

formatPlural(5, 'item', '{{count}} items');
// => '5 items'
```

## Build System

### Type Generation

Automatically generates TypeScript types from your translation files:

```bash
npm run generate-translations
```

This creates:

- `src/types/translations.ts` - Type definitions
- `src/translations/defaultTranslations.ts` - Default translations

### Hash Generation

For optimal caching, generate hashed translation files:

```javascript
// scripts/hash-translations.js
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

## Examples

### Language Switcher Component

```tsx
import { useTranslation } from '@mffl/use-translation';
import { createLanguageConfig } from '@mffl/use-translation';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.nativeName}
        </option>
      ))}
    </select>
  );
}
```

### Multiple Namespaces

```tsx
import { useTranslation } from '@mffl/use-translation';

export default function Dashboard() {
  const { t } = useTranslation(['common', 'dashboard']);

  return (
    <div>
      <button>{t('nav.back', 'common')}</button>
      <h1>{t('title', 'dashboard')}</h1>
      <p>{t('welcomeMessage', 'dashboard')}</p>
    </div>
  );
}
```

### With Variable Interpolation

```tsx
import { useTranslation, interpolate } from '@mffl/use-translation';

export default function Greeting({ userName }) {
  const { t } = useTranslation(['common']);

  return <p>{interpolate(t('greeting'), { name: userName })}</p>;
}
```

## Advanced Configuration

### Custom Locales Path

```tsx
<TranslationProvider
  localesPath="/custom-locales"
  localesHashedPath="/custom-hashed"
  // ... other props
>
  {children}
</TranslationProvider>
```

### Language Detection

```tsx
import { useEffect } from 'react';
import { useTranslation } from '@mffl/use-translation';

function useLanguageDetection() {
  const { setLanguage } = useTranslation();

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (['en', 'es', 'fr'].includes(browserLang)) {
      setLanguage(browserLang);
    }
  }, [setLanguage]);
}
```

## Performance

- **Bundle Size**: ~3KB gzipped (core library)
- **Default Translations**: Bundled with app (~10-20KB depending on content)
- **Other Languages**: Lazy-loaded on demand
- **Caching**: Aggressive (1 year) with content-based invalidation

## Requirements

- React >= 16.8.0 (for hooks support)
- TypeScript >= 4.0 (optional, but recommended)
- Node.js >= 16.0.0

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) first.

## License

MIT © [MFFL](LICENSE)

## Support

- 📖 [Full Documentation](./docs)
- 🐛 [Issue Tracker](https://github.com/parmdhillon/useTranslation/issues)
- 💬 [Discussions](https://github.com/parmdhillon/useTranslation/discussions)

## Credits

Built with ❤️ for Next.js static exports.

---

<div align="center">

**[⬆ back to top](#mffluse-translation)**

</div>
