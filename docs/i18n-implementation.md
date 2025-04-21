# Internationalization (i18n) Implementation

This document explains how internationalization has been implemented in the Keyholders Agency website.

## Overview

The Keyholders Agency website now supports multiple languages with Dutch (Nederlands) as the default language and English as an alternative option. The language selection is persisted in the user's browser localStorage.

## Key Components

1. **Language Context**: Located at `app/i18n/context.tsx`
   - Provides a React context to manage the current language and translations
   - Persists language selection in localStorage
   - Exposes the `useI18n` hook for accessing translations

2. **Translation Dictionaries**:
   - Dutch: `app/i18n/dictionaries/nl.json`
   - English: `app/i18n/dictionaries/en.json`

3. **Language Switcher**: Located at `components/language-switcher.tsx`
   - Provides a dropdown with flag icons for switching languages
   - Shows the current language flag in the navigation bar

4. **Flag SVGs**:
   - Dutch: `public/images/flags/nl.svg`
   - British: `public/images/flags/gb.svg`

## Implementation Details

1. **Root Layout**: The `app/layout.tsx` file has been updated to:
   - Set the default HTML language attribute to "nl"
   - Wrap the application with the `I18nProvider`

2. **Navbar**: The navbar component now:
   - Uses translations for all navigation items
   - Includes the language switcher in the top-right corner
   - Adapts to the selected language

3. **Content Pages**: Content pages like the AI scan page now:
   - Use the current language to determine which content to display
   - Can conditionally load different resources based on language

## How to Use

### Accessing Translations

```tsx
import { useI18n } from "@/app/i18n/context";

export default function MyComponent() {
  const { dictionary } = useI18n();
  
  return (
    <div>
      <h1>{dictionary.some.nested.translation.key}</h1>
    </div>
  );
}
```

### Switching Languages

```tsx
import { useI18n } from "@/app/i18n/context";

export default function MyComponent() {
  const { language, changeLanguage } = useI18n();
  
  return (
    <button onClick={() => changeLanguage(language === 'nl' ? 'en' : 'nl')}>
      Switch Language
    </button>
  );
}
```

### Adding New Translation Keys

To add new translations, update both dictionary files:

1. Add the new key to `app/i18n/dictionaries/en.json`
2. Add the same key structure with translated content to `app/i18n/dictionaries/nl.json`

### Adding More Languages

To add a new language:

1. Create a new dictionary file (e.g., `app/i18n/dictionaries/fr.json`)
2. Update the `Language` type and `dictionaries` object in `app/i18n/context.tsx`
3. Add the language option to the language switcher component

## Notes

- The default language is set to Dutch (nl) since the primary target audience is in the Netherlands.
- Language selection is persisted in localStorage so users don't need to switch languages on each visit.
- The HTML lang attribute is set to "nl" in the root layout for SEO and accessibility. 