/**
 * Privacy-friendly client-side analytics and telemetry for CABECS.
 * Tracks engagement events (CTAs, form submissions, diagnostics, WhatsApp conversions).
 * Compliant with Cameroonian Law N° 2010/012 & OHADA standards.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type EventCategory = 
  | 'CTA' 
  | 'Diagnostic' 
  | 'Consultation' 
  | 'WhatsApp' 
  | 'Navigation' 
  | 'Legal' 
  | 'Cookie'
  | 'Language';

export interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  timestamp: string;
}

const STORAGE_KEY = 'cabecs_analytics_events';

export const trackEvent = (
  category: EventCategory,
  action: string,
  label?: string,
  value?: number
) => {
  const event: AnalyticsEvent = {
    category,
    action,
    label,
    value,
    timestamp: new Date().toISOString(),
  };

  // Google Analytics 4 integration if installed
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Local anonymous telemetry logging (capped at 50 most recent events for debugging/reporting)
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    events.unshift(event);
    if (events.length > 50) events.length = 50;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // Silent catch if localStorage unavailable
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info(`[CABECS Analytics] [${category}] ${action}`, label ? `-> ${label}` : '');
  }
};

export const trackPageView = (pageName: string) => {
  trackEvent('Navigation', 'page_view', pageName);
};
