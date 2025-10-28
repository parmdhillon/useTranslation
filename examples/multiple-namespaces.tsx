/**
 * Multiple Namespaces Example
 * This demonstrates how to use multiple translation namespaces
 */

import React from 'react';
import { useTranslation } from '@mffl/use-translation';

export function DashboardPage() {
  // Load multiple namespaces at once
  const { t } = useTranslation(['common', 'dashboard', 'user']);

  return (
    <div>
      <header>
        <button>{t('nav.back', 'common')}</button>
        <h1>{t('title', 'dashboard')}</h1>
      </header>

      <main>
        <section>
          <h2>{t('stats.title', 'dashboard')}</h2>
          <p>{t('stats.description', 'dashboard')}</p>
        </section>

        <section>
          <h2>{t('profile.title', 'user')}</h2>
          <p>{t('profile.bio', 'user')}</p>
        </section>
      </main>
    </div>
  );
}

// Lazy loading namespace
export function ProfilePage() {
  // Only load 'user' namespace when this component mounts
  const { t, isLoading } = useTranslation(['common', 'user']);

  if (isLoading) {
    return <div>{t('loading', 'common')}</div>;
  }

  return (
    <div>
      <h1>{t('profile.title', 'user')}</h1>
      <p>{t('profile.description', 'user')}</p>
    </div>
  );
}

/**
 * Example translation files:
 *
 * public/locales/en/common.json
 * {
 *   "nav": { "back": "Back" },
 *   "loading": "Loading..."
 * }
 *
 * public/locales/en/dashboard.json
 * {
 *   "title": "Dashboard",
 *   "stats": {
 *     "title": "Statistics",
 *     "description": "View your statistics"
 *   }
 * }
 *
 * public/locales/en/user.json
 * {
 *   "profile": {
 *     "title": "Profile",
 *     "description": "Manage your profile",
 *     "bio": "Your bio"
 *   }
 * }
 */
