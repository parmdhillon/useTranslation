/**
 * Basic usage example
 * This demonstrates the simplest way to use the translation library
 */

import React from 'react';
import { useTranslation } from '@mffl/use-translation';

export function BasicUsageExample() {
  const { t } = useTranslation(['common']);

  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('welcome.description')}</p>
      <button>{t('nav.back')}</button>
    </div>
  );
}

/**
 * Example translation file: public/locales/en/common.json
 * {
 *   "welcome": {
 *     "title": "Welcome",
 *     "description": "Get started with our application"
 *   },
 *   "nav": {
 *     "back": "Back"
 *   }
 * }
 */
