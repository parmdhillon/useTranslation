/**
 * Language Switcher Example
 * This demonstrates how to build a language switcher component
 */

import React from 'react';
import { useTranslation, createLanguageConfig } from '@mffl/use-translation';

// Define supported languages
const languageConfig = createLanguageConfig(
  [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  ] as const,
  'en'
);

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation(['common']);

  return (
    <div className="language-switcher">
      <label htmlFor="language-select">{t('language.select')}</label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value as any)}
      >
        {languageConfig.languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
    </div>
  );
}

// Dropdown with flags (advanced)
export function LanguageSwitcherWithFlags() {
  const { language, setLanguage } = useTranslation(['common']);
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLanguage = languageConfig.getLanguageByCode(language);

  return (
    <div className="language-switcher-dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>
        {currentLanguage?.nativeName}
      </button>

      {isOpen && (
        <ul>
          {languageConfig.languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as any);
                setIsOpen(false);
              }}
            >
              <span>{lang.nativeName}</span>
              <span>{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
