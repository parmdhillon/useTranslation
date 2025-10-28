/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Creates content-based hashed copies of translation files
 * This enables long-term caching with automatic cache invalidation
 *
 * @param {string} localesDir - Path to source locales directory
 * @param {string} hashedDir - Path to output hashed directory
 * @param {string} manifestPath - Path for JSON manifest
 * @param {string} tsManifestPath - Path for TypeScript manifest
 */
function hashTranslations(
  localesDir,
  hashedDir,
  manifestPath,
  tsManifestPath
) {
  const manifest = {};

  // Ensure the hashed directory exists
  if (!fs.existsSync(hashedDir)) {
    fs.mkdirSync(hashedDir, { recursive: true });
  }

  console.log('Source locales directory:', localesDir);
  console.log('Hashed locales directory:', hashedDir);

  // Get all language directories
  const langDirs = fs.readdirSync(localesDir).filter((item) => {
    const itemPath = path.join(localesDir, item);
    return fs.existsSync(itemPath) && fs.statSync(itemPath).isDirectory();
  });

  console.log('Found language directories:', langDirs);

  // Process each language directory
  for (const lang of langDirs) {
    const langPath = path.join(localesDir, lang);
    const hashedLangPath = path.join(hashedDir, lang);

    // Ensure the language directory exists in the hashed location
    if (!fs.existsSync(hashedLangPath)) {
      fs.mkdirSync(hashedLangPath, { recursive: true });
    }

    console.log(`Processing language directory: ${lang}`);

    // Get all JSON files in the language directory
    const jsonFiles = fs
      .readdirSync(langPath)
      .filter((file) => file.endsWith('.json'));

    console.log(`Found ${jsonFiles.length} JSON files in ${lang}:`, jsonFiles);

    // Clean up old hashed files to prevent accumulation
    if (fs.existsSync(hashedLangPath)) {
      fs.readdirSync(hashedLangPath)
        .filter((file) => file.endsWith('.json'))
        .forEach((oldHashedFile) => {
          try {
            fs.unlinkSync(path.join(hashedLangPath, oldHashedFile));
            console.log(`Removed old hashed file: ${oldHashedFile}`);
          } catch (err) {
            console.error(
              `Failed to remove old hashed file ${oldHashedFile}:`,
              err
            );
          }
        });
    }

    for (const file of jsonFiles) {
      const filePath = path.join(langPath, file);
      const hash = generateHash(filePath);

      // Create new filename with hash
      const fileNameWithoutExt = file.replace('.json', '');
      const hashedFileName = `${fileNameWithoutExt}.${hash}.json`;
      const hashedFilePath = path.join(hashedLangPath, hashedFileName);

      // Copy file with hashed name
      fs.copyFileSync(filePath, hashedFilePath);
      console.log(`Created hashed file: ${lang}/${hashedFileName}`);

      // Store namespace and hashed filename in manifest
      manifest[`${lang}/${fileNameWithoutExt}`] = `${lang}/${hashedFileName}`;
    }
  }

  // Add timestamp to manifest to ensure it's different each build
  manifest._buildTime = new Date().toISOString();

  // Write JSON manifest file
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ Translation hash manifest generated at: ${manifestPath}`);

  // Generate TypeScript file with manifest
  generateTSManifest(manifest, tsManifestPath);
  console.log(`✅ TypeScript manifest generated at: ${tsManifestPath}`);
}

/**
 * Create a hash based on file content
 */
function generateHash(filePath) {
  const fileContent = fs.readFileSync(filePath);
  return crypto
    .createHash('md5')
    .update(fileContent)
    .digest('hex')
    .substring(0, 8);
}

/**
 * Generate TypeScript file with manifest data
 */
function generateTSManifest(manifest, tsManifestPath) {
  // Remove buildTime from TypeScript manifest as it's not needed there
  const tsManifest = { ...manifest };
  delete tsManifest._buildTime;

  const tsContent = `// THIS FILE IS AUTO-GENERATED - DO NOT EDIT MANUALLY
// It provides the mapping between translation namespaces and their hashed filenames

export interface TranslationManifest {
  [key: string]: string;
}

// This is populated with the manifest generated during build
export const translationManifest: TranslationManifest = ${JSON.stringify(
    tsManifest,
    null,
    2
  )};
`;

  fs.writeFileSync(tsManifestPath, tsContent);
}

module.exports = {
  hashTranslations,
  generateHash,
};
