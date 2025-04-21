import { I18nProvider } from '@/app/i18n/context'
import { ReactNode } from 'react'

export default function DutchLayout({ children }: { children: ReactNode }) {
  // Modify the html lang attribute for Dutch pages
  if (typeof window !== 'undefined') {
    document.documentElement.lang = 'nl';
  }

  return (
    <I18nProvider forcedLocale="nl">
      {children}
    </I18nProvider>
  )
} 