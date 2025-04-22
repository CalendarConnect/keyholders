// Type declarations for Google Analytics
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'consent',
      actionOrTarget: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export {}; 