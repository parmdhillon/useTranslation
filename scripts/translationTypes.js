/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

/**
 * Generates TypeScript interfaces from translation JSON files
 * This is used in a build script to keep types in sync with translations
 *
 * @param {string} localesDir - Path to the locales directory (e.g., 'public/locales/en')
 * @param {string} outputPath - Path for the generated types file
 */
function generateTranslationTypes(localesDir, outputPath) {
  const files = fs.readdirSync(localesDir);
  const namespaces = files
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.basename(file, '.json'));

  let output = `// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY\n`;
  output += `// Generated from translation files in ${localesDir}\n\n`;

  // Generate the TranslationNamespace type
  output += `export type TranslationNamespace = ${namespaces
    .map((ns) => `'${ns}'`)
    .join(' | ')};\n\n`;

  // Generate interfaces for each namespace
  for (const namespace of namespaces) {
    const filePath = path.join(localesDir, `${namespace}.json`);
    const content = fs.readFileSync(filePath, 'utf8');
    const translations = JSON.parse(content);

    const interfaceName = `${namespace
      .charAt(0)
      .toUpperCase()}${namespace.slice(1)}Translations`;
    output += `export interface ${interfaceName} {\n`;
    output += generateInterfaceProperties(translations, 2);
    output += `}\n\n`;
  }

  // Generate the main Translations interface
  output += `export interface Translations {\n`;
  for (const namespace of namespaces) {
    const interfaceName = `${namespace
      .charAt(0)
      .toUpperCase()}${namespace.slice(1)}Translations`;
    output += `  ${namespace}: ${interfaceName};\n`;
  }
  output += `}\n\n`;

  // Generate utility types for path-based translation keys
  output += `// Utility types for type-safe translation keys\n`;
  output += `type PathImpl<T, Key extends keyof T> = Key extends string\n`;
  output += `  ? T[Key] extends Record<string, any>\n`;
  output += `    ? \`\${Key}.\${PathImpl<T[Key], keyof T[Key]>}\`\n`;
  output += `    : Key\n`;
  output += `  : never;\n\n`;

  output += `type Path<T> = PathImpl<T, keyof T>;\n\n`;

  // Generate type for each namespace's translation keys
  for (const namespace of namespaces) {
    const interfaceName = `${namespace
      .charAt(0)
      .toUpperCase()}${namespace.slice(1)}Translations`;
    const typeKeyName = `${namespace.charAt(0).toUpperCase()}${namespace.slice(
      1
    )}TranslationKey`;

    output += `export type ${typeKeyName} = Path<${interfaceName}>;\n`;
  }
  output += `\n`;

  // Generate TranslationKey mapped type
  output += `export type TranslationKey<N extends TranslationNamespace> = `;
  let unionTypes = [];
  for (const namespace of namespaces) {
    const typeKeyName = `${namespace.charAt(0).toUpperCase()}${namespace.slice(
      1
    )}TranslationKey`;
    unionTypes.push(`N extends '${namespace}' ? ${typeKeyName}`);
  }
  output += unionTypes.join('\n  : ');
  output += `\n  : never;\n`;

  // Add SupportedLanguage type placeholder
  output += `\n// Replace this with your actual supported language type\n`;
  output += `export type SupportedLanguage = string;\n`;

  fs.writeFileSync(outputPath, output);
  console.log(`✅ Generated translation types at ${outputPath}`);
}

function generateInterfaceProperties(obj, indent) {
  let output = '';
  const indentStr = ' '.repeat(indent);

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      output += `${indentStr}${key}: {\n`;
      output += generateInterfaceProperties(value, indent + 2);
      output += `${indentStr}};\n`;
    } else {
      output += `${indentStr}${key}: string;\n`;
    }
  }

  return output;
}

/**
 * Generates the default translations TypeScript file from JSON files
 * This ensures the hardcoded translations stay in sync
 *
 * @param {string} localesDir - Path to the locales directory
 * @param {string} outputPath - Path for the generated file
 */
function generateDefaultTranslations(localesDir, outputPath) {
  const files = fs.readdirSync(localesDir);
  const namespaces = files
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.basename(file, '.json'));

  // Build translations object from JSON files
  const translations = {};
  for (const namespace of namespaces) {
    const filePath = path.join(localesDir, `${namespace}.json`);
    const content = fs.readFileSync(filePath, 'utf8');
    translations[namespace] = JSON.parse(content);
  }

  // Generate the TypeScript file
  let output = `// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY\n`;
  output += `// Generated from translation files in ${localesDir}\n`;
  output += `// To update, modify the JSON files and run the generation script\n\n`;
  output += `import { Translations } from '../types/translations';\n\n`;
  output += `// Default translations (bundled with the app)\n`;
  output += `export const defaultTranslations: Translations = ${JSON.stringify(
    translations,
    null,
    2
  )};\n`;

  fs.writeFileSync(outputPath, output);
  console.log(`✅ Generated default translations at ${outputPath}`);
}

module.exports = {
  generateTranslationTypes,
  generateDefaultTranslations,
};
