// Measurement ID for Google Analytics
export const GA_MEASUREMENT_ID = 'G-LHLZLNES7F';

// Function to send page views to Google Analytics
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Function to send events to Google Analytics
type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};

// Function to update consent status
export const updateGoogleAnalyticsConsent = (hasConsent: boolean) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('consent', 'update', {
      'analytics_storage': hasConsent ? 'granted' : 'denied'
    });
  }
};

// Function to check if the user has given consent
export const hasGoogleAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  return localStorage.getItem('cookie_consent') === 'accepted';
};

// Function to initialize Google Analytics based on current consent state
export const initializeGoogleAnalytics = () => {
  const hasConsent = hasGoogleAnalyticsConsent();
  updateGoogleAnalyticsConsent(hasConsent);
  return hasConsent;
}; 