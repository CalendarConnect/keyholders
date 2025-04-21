import { I18nProvider } from '@/app/i18n/context'
import { ReactNode } from 'react'

export default function EnglishLayout({ children }: { children: ReactNode }) {
  // Modify the html lang attribute for English pages
  if (typeof window !== 'undefined') {
    document.documentElement.lang = 'en';
  }

  return (
    <I18nProvider forcedLocale="en">
      {children}
    </I18nProvider>
  )
} 