/**
 * Example script for generating translation types
 * Place this in your project's scripts/ directory
 */

const path = require('path');
const {
  generateTranslationTypes,
  generateDefaultTranslations,
} = require('@mffl/use-translation/scripts');

// Configuration
const LOCALES_DIR = path.resolve(process.cwd(), 'public/locales/en');
const TYPES_OUTPUT = path.resolve(
  process.cwd(),
  'src/types/translations.ts'
);
const DEFAULT_TRANS_OUTPUT = path.resolve(
  process.cwd(),
  'src/translations/defaultTranslations.ts'
);

// Generate types from English translation files
try {
  console.log('🔄 Generating translation types...');
  generateTranslationTypes(LOCALES_DIR, TYPES_OUTPUT);

  console.log('🔄 Generating default translations...');
  generateDefaultTranslations(LOCALES_DIR, DEFAULT_TRANS_OUTPUT);

  console.log('✅ Translation generation complete!');
} catch (error) {
  console.error('❌ Error generating translations:', error);
  process.exit(1);
}
