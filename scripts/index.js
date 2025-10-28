/**
 * Export all script utilities
 */

const {
  generateTranslationTypes,
  generateDefaultTranslations,
} = require('./translationTypes');

const { hashTranslations, generateHash } = require('./hashTranslations');

module.exports = {
  generateTranslationTypes,
  generateDefaultTranslations,
  hashTranslations,
  generateHash,
};
