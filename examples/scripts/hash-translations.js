/**
 * Example script for generating hashed translation files
 * Place this in your project's scripts/ directory
 */

const path = require('path');
const { hashTranslations } = require('@mffl/use-translation/scripts');

// Configuration
const LOCALES_DIR = path.resolve(process.cwd(), 'public/locales');
const HASHED_DIR = path.resolve(process.cwd(), 'public/locales-hashed');
const MANIFEST_PATH = path.resolve(HASHED_DIR, 'manifest.json');
const TS_MANIFEST_PATH = path.resolve(
  process.cwd(),
  'src/translations/translationManifest.ts'
);

// Generate hashed files and manifests
try {
  console.log('🔄 Generating hashed translation files...');
  hashTranslations(LOCALES_DIR, HASHED_DIR, MANIFEST_PATH, TS_MANIFEST_PATH);
  console.log('✅ Hash generation complete!');
} catch (error) {
  console.error('❌ Error generating hashes:', error);
  process.exit(1);
}
