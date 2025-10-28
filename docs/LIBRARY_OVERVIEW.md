# Library Overview

Complete overview of the @mffl/use-translation library architecture and design decisions.

## Design Philosophy

The library was built with these core principles:

1. **Type Safety First** - Full TypeScript support with auto-generated types
2. **Zero Dependencies** - No external i18n libraries, minimal bundle size
3. **Static Export Friendly** - Built specifically for Next.js static exports
4. **Performance Focused** - Lazy loading, content hashing, optimal caching
5. **Developer Experience** - Simple API, great autocomplete, minimal configuration

## Architecture

### Core Components

```
┌─────────────────────────────────────────────────────┐
│                 TranslationProvider                  │
│  - Manages translation state                        │
│  - Handles language switching                       │
│  - Loads translations on demand                     │
└─────────────────┬───────────────────────────────────┘
                  │
                  ├── useTranslation Hook
                  │   - React hook for components
                  │   - Provides t() function
                  │   - Manages namespace loading
                  │
                  ├── Translation Context
                  │   - React Context for state
                  │   - Shared across components
                  │
                  └── Translation Loading System
                      - Fetches JSON files
                      - Uses hash manifest
                      - Fallback to default
```

### Data Flow

```
1. Component calls useTranslation(['common'])
   ↓
2. Hook requests namespace from context
   ↓
3. Context checks if namespace loaded
   ↓
4. If not loaded:
   - Look up hashed filename in manifest
   - Fetch JSON file
   - Cache in state
   ↓
5. Return t() function to component
   ↓
6. Component calls t('nav.back')
   ↓
7. t() function:
   - Splits key by dots
   - Traverses nested object
   - Returns string value
```

### Type System

The library uses advanced TypeScript features for type safety:

#### Path-Based Types

Converts nested objects to dot-notation strings:

```typescript
// Input
interface CommonTranslations {
  nav: {
    back: string;
    home: string;
  };
  loading: string;
}

// Generated Type
type CommonTranslationKey =
  | "nav.back"
  | "nav.home"
  | "loading";
```

**How it works:**

```typescript
type PathImpl<T, Key extends keyof T> =
  Key extends string
    ? T[Key] extends Record<string, any>
      ? `${Key}.${PathImpl<T[Key], keyof T[Key]>}`  // Nested
      : Key                                           // Leaf
    : never;
```

This recursively builds union types of all possible paths.

#### Namespace Mapping

Maps namespace to correct key type:

```typescript
type TranslationKey<N extends TranslationNamespace> =
  N extends 'common' ? CommonTranslationKey
  : N extends 'user' ? UserTranslationKey
  : never;

// Usage
useTranslation(['common'])
t('nav.back')  // ✅ CommonTranslationKey
t('user.name') // ❌ TypeScript error
```

### Build System

#### Type Generation

**Input:** JSON translation files

```json
// public/locales/en/common.json
{
  "nav": {
    "back": "Back"
  }
}
```

**Output:** TypeScript interfaces

```typescript
// src/types/translations.ts
export interface CommonTranslations {
  nav: {
    back: string;
  };
}
```

**Process:**

1. Read all JSON files from `en/` directory
2. Parse JSON structure
3. Generate TypeScript interface for each file
4. Generate utility types for path-based keys
5. Write to output file

#### Hash Generation

**Purpose:** Content-based cache invalidation

**Input:** Translation files

```
public/locales/en/common.json
```

**Output:** Hashed files + manifest

```
public/locales-hashed/en/common.a1b2c3d4.json
src/utils/translationManifest.ts
```

**Process:**

1. Read all translation files
2. Generate MD5 hash of content
3. Copy file with hash in filename
4. Create manifest mapping original → hashed
5. Generate TypeScript manifest

**Benefits:**

- Files cached indefinitely (immutable URLs)
- When content changes, new hash generated
- Old cached files automatically invalidated
- No manual cache management needed

## Component Architecture

### TranslationProvider

Central provider component that:

- Initializes language from localStorage
- Provides translation state via Context
- Manages namespace loading
- Handles language switching

**State:**

```typescript
{
  language: SupportedLanguage;
  translations: Partial<Translations>;
  loadedNamespaces: Set<string>;
  isLoading: boolean;
}
```

**Methods:**

```typescript
{
  setLanguage: (lang) => void;
  t: (key, namespace?) => string;
  loadNamespaces: (namespaces) => void;
}
```

### useTranslation Hook

React hook that provides translation functionality:

**Input:**

```typescript
useTranslation(['common', 'user'])
```

**Output:**

```typescript
{
  t: (key, namespace?) => string;
  language: string;
  setLanguage: (lang) => void;
  isLoading: boolean;
}
```

**Behavior:**

1. Access TranslationContext
2. Request namespaces to load
3. Create scoped t() function
4. Return utilities

### Translation Function `t()`

Core function for getting translations:

**Implementation:**

```typescript
t(key: 'nav.back', namespace: 'common') => {
  // 1. Split key by dots
  const parts = key.split('.'); // ['nav', 'back']

  // 2. Get namespace data
  let value = translations['common'];

  // 3. Traverse path
  for (const part of parts) {
    value = value[part]; // nav -> back
  }

  // 4. Return string
  return value; // "Back"
}
```

## Performance Optimizations

### Bundle Size

- Core library: ~3KB gzipped
- Default translations: Bundled (10-20KB)
- Other languages: Lazy loaded

### Loading Strategy

1. **Initial Load**
   - English translations bundled in JS
   - Instant availability
   - No network requests

2. **Language Switch**
   - Fetch only requested language
   - Fetch only needed namespaces
   - Cache in memory

3. **Namespace Lazy Loading**
   - Load namespaces on demand
   - Not all namespaces needed everywhere
   - Reduces initial bundle

### Caching Strategy

```
# Hashed files
Cache-Control: public, max-age=31536000, immutable

# Manifest
Cache-Control: public, max-age=3600
```

- Hashed files: 1 year cache (immutable)
- Manifest: 1 hour cache (allows updates)
- Content change → New hash → New URL → Bypass cache

### React Optimizations

**useMemo:**

```typescript
const t = useMemo(
  () => (key, namespace) => translate(key, namespace),
  [translate, namespaces]
);
```

Prevents recreation of t() function on every render.

**useCallback:**

```typescript
const loadNamespaces = useCallback(
  (namespaces) => { /* ... */ },
  [loadedNamespaces, loadTranslationsForNamespaces]
);
```

Stable function reference for useEffect dependencies.

## Design Decisions

### Why No External Dependencies?

- Smaller bundle size
- Full control over implementation
- No version conflicts
- No security vulnerabilities from deps
- Simpler maintenance

### Why Content-Based Hashing?

- Automatic cache invalidation
- Long-term caching for unchanged files
- No manual cache busting needed
- CDN-friendly
- Optimal for static exports

### Why Namespace System?

- Code splitting by feature
- Load only needed translations
- Better organization
- Smaller initial bundle
- Faster page loads

### Why TypeScript-First?

- Catch errors at compile time
- Better IDE experience
- Self-documenting code
- Easier refactoring
- Prevents typos in keys

### Why Auto-Generated Types?

- Single source of truth (JSON)
- Types always in sync
- No manual maintenance
- Impossible to have outdated types
- Catches missing translations

## Extensibility

### Custom Formatters

Extend with custom formatting functions:

```typescript
import { useTranslation, interpolate } from '@mffl/use-translation';

function useCurrencyTranslation() {
  const { t, language } = useTranslation(['common']);

  const tc = (key: string, amount: number) => {
    const text = t(key);
    const formatted = new Intl.NumberFormat(language, {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
    return interpolate(text, { amount: formatted });
  };

  return { t, tc };
}
```

### Custom Loaders

Implement custom loading logic:

```typescript
const loadTranslationsForNamespaces = async (namespaces) => {
  // Custom API endpoint
  const response = await fetch(`/api/translations/${language}/${namespace}`);
  const data = await response.json();
  // Process and set translations
};
```

### Plugin System

Future enhancement: Plugin system for:

- Custom placeholder syntax
- ICU message format
- Translation validation
- Missing key detection
- Usage analytics

## Comparison with Other Libraries

### vs react-i18next

| Feature | @mffl/use-translation | react-i18next |
|---------|----------------------|---------------|
| Bundle Size | 3KB | 40KB+ |
| Dependencies | 0 | Multiple |
| Type Safety | Full (auto-gen) | Partial |
| Static Export | ✅ Yes | ⚠️ Limited |
| Setup | Simple | Complex |
| Performance | Optimized | Good |

### vs next-i18next

| Feature | @mffl/use-translation | next-i18next |
|---------|----------------------|---------------|
| Static Export | ✅ Yes | ❌ No |
| Type Safety | Full | Limited |
| Bundle Size | 3KB | Large |
| SSR Required | No | Yes |

### vs formatjs/react-intl

| Feature | @mffl/use-translation | react-intl |
|---------|----------------------|---------------|
| Bundle Size | 3KB | 60KB+ |
| ICU Format | Manual | Built-in |
| Type Safety | Full | Partial |
| Learning Curve | Easy | Steep |

## Future Enhancements

Potential features for future versions:

1. **Pluralization Engine**
   - Built-in plural rules
   - ICU-style syntax
   - Language-specific rules

2. **Translation Validation**
   - Check for missing keys
   - Detect unused translations
   - Validate variable placeholders

3. **Translation UI**
   - In-browser translation editor
   - Preview changes live
   - Export updated files

4. **Analytics**
   - Track used translations
   - Identify dead code
   - Usage patterns

5. **Advanced Caching**
   - Service worker integration
   - IndexedDB storage
   - Offline support

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on contributing to the library.

## Resources

- [Setup Guide](./SETUP.md)
- [API Reference](../README.md#api-reference)
- [Examples](../examples/)
- [Publishing Guide](../PUBLISHING.md)

---

This library is designed to be simple, type-safe, and performant for Next.js static exports. If you have questions or suggestions, please open an issue!
