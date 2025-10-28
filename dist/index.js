"use strict";
/**
 * @mffl/use-translation
 *
 * A fully type-safe, zero-dependency internationalization library for Next.js static exports
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPlural = exports.interpolate = exports.createLanguageConfig = exports.TranslationContext = exports.TranslationProvider = exports.useTranslation = void 0;
// Main exports
var useTranslation_1 = require("./hooks/useTranslation");
Object.defineProperty(exports, "useTranslation", { enumerable: true, get: function () { return useTranslation_1.useTranslation; } });
var TranslationContext_1 = require("./contexts/TranslationContext");
Object.defineProperty(exports, "TranslationProvider", { enumerable: true, get: function () { return TranslationContext_1.TranslationProvider; } });
Object.defineProperty(exports, "TranslationContext", { enumerable: true, get: function () { return TranslationContext_1.TranslationContext; } });
// Utility exports
var languageConfig_1 = require("./utils/languageConfig");
Object.defineProperty(exports, "createLanguageConfig", { enumerable: true, get: function () { return languageConfig_1.createLanguageConfig; } });
var translationHelpers_1 = require("./utils/translationHelpers");
Object.defineProperty(exports, "interpolate", { enumerable: true, get: function () { return translationHelpers_1.interpolate; } });
Object.defineProperty(exports, "formatPlural", { enumerable: true, get: function () { return translationHelpers_1.formatPlural; } });
