/**
 * Variable Interpolation Example
 * This demonstrates how to use variables in translations
 */

import React from 'react';
import { useTranslation, interpolate, formatPlural } from '@mffl/use-translation';

// Simple variable interpolation
export function GreetingComponent({ userName }: { userName: string }) {
  const { t } = useTranslation(['common']);

  return (
    <div>
      {/* Manual replacement */}
      <h1>{t('greeting').replace('{{name}}', userName)}</h1>

      {/* Using helper function */}
      <p>{interpolate(t('welcomeMessage'), { name: userName })}</p>
    </div>
  );
}

// Multiple variables
export function OrderSummary({
  itemCount,
  totalPrice,
  userName,
}: {
  itemCount: number;
  totalPrice: number;
  userName: string;
}) {
  const { t } = useTranslation(['common']);

  return (
    <div>
      <h2>{interpolate(t('order.summary'), { name: userName })}</h2>
      <p>
        {interpolate(t('order.details'), {
          count: itemCount,
          price: totalPrice.toFixed(2),
        })}
      </p>
    </div>
  );
}

// Pluralization
export function ItemCounter({ count }: { count: number }) {
  const { t } = useTranslation(['common']);

  return (
    <div>
      {/* Simple pluralization */}
      <p>{formatPlural(count, t('items.one'), t('items.many'))}</p>

      {/* With count in the string */}
      <p>
        {formatPlural(
          count,
          '1 item in cart',
          interpolate(t('items.count'), { count })
        )}
      </p>
    </div>
  );
}

// Advanced: Custom formatting
export function FormattedMessage({
  messageKey,
  values,
}: {
  messageKey: string;
  values: Record<string, string | number>;
}) {
  const { t } = useTranslation(['common']);

  // Get the translation
  const message = t(messageKey as any);

  // Apply all interpolations
  return <p>{interpolate(message, values)}</p>;
}

// Usage example
export function Example() {
  return (
    <div>
      <GreetingComponent userName="John" />
      <OrderSummary itemCount={5} totalPrice={99.99} userName="John" />
      <ItemCounter count={3} />
      <FormattedMessage
        messageKey="custom.message"
        values={{ name: 'John', age: 30, city: 'New York' }}
      />
    </div>
  );
}

/**
 * Example translation file: public/locales/en/common.json
 * {
 *   "greeting": "Hello, {{name}}!",
 *   "welcomeMessage": "Welcome back, {{name}}",
 *   "order": {
 *     "summary": "Order Summary for {{name}}",
 *     "details": "{{count}} items - ${{price}}"
 *   },
 *   "items": {
 *     "one": "1 item",
 *     "many": "{{count}} items",
 *     "count": "{{count}} items in cart"
 *   },
 *   "custom": {
 *     "message": "{{name}} is {{age}} years old and lives in {{city}}"
 *   }
 * }
 */
