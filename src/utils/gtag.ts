import { config } from '../config';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Initializes Google Tag (gtag.js) when googleTagId is set in config.
 * Injects the script into the document head and configures the tag.
 */
export function initGtag(): void {
  const tagId = (config as { gtag_id?: string; googleTagId?: string }).gtag_id || (config as { googleTagId?: string }).googleTagId;
  if (!tagId || typeof tagId !== 'string' || !tagId.trim()) {
    return;
  }

  const id = tagId.trim();
  // If gtag is already loaded (e.g. from index.html), just ensure config is applied
  if (typeof window.gtag === 'function') {
    window.gtag('config', id);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.gtag('config', id);
}

/**
 * Fires a Google Ads conversion event.
 * Call this on the Thank You page when both googleTagId and conversionLabel are set.
 */
export function trackConversion(): void {
  const cfg = config as { gtag_id?: string; googleTagId?: string; conversion_label?: string; conversionLabel?: string };
  const tagId = (cfg.gtag_id || cfg.googleTagId || '').trim();
  const label = (cfg.conversion_label || cfg.conversionLabel || '').trim();
  if (!tagId || !label || typeof window.gtag !== 'function') {
    return;
  }
  window.gtag('event', 'conversion', { send_to: `${tagId}/${label}` });
}

type TrackedChannel = 'call' | 'whatsapp';

const CHANNEL_LABEL_KEYS: Record<TrackedChannel, 'conversion_label_call' | 'conversion_label_whatsapp'> = {
  call: 'conversion_label_call',
  whatsapp: 'conversion_label_whatsapp',
};

/**
 * Fires a per-channel conversion for call and WhatsApp taps, so Smart Bidding
 * sees them alongside form submits. No-ops until the channel label is set in config.
 */
export function trackChannelConversion(channel: TrackedChannel): void {
  const cfg = config as Record<string, string | undefined>;
  const tagId = (cfg.gtag_id || '').trim();
  const label = (cfg[CHANNEL_LABEL_KEYS[channel]] || '').trim();
  if (!tagId || !label || typeof window.gtag !== 'function') {
    return;
  }
  window.gtag('event', 'conversion', {
    send_to: `${tagId}/${label}`,
    event_category: 'contact',
    event_label: channel,
  });
}

/**
 * Fires a plain (non-conversion) GA4 event, e.g. a micro-conversion like the
 * master-plan PDF download. Distinct from trackConversion/trackChannelConversion,
 * which report to Google Ads under a conversion label.
 */
export function trackCustomEvent(name: string, params?: Record<string, string>): void {
  if (typeof window.gtag !== 'function') {
    return;
  }
  window.gtag('event', name, params || {});
}

/**
 * Returns the ad attribution params from the landing URL, persisted for the session
 * so they survive the navigation to /thank-you.
 */
export function getAdAttribution(): Record<string, string> {
  const KEY = 'hp_ad_attribution';
  const TRACKED = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(KEY) || '{}');
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  let changed = false;
  TRACKED.forEach((key) => {
    const value = params.get(key);
    if (value && !stored[key]) {
      stored[key] = value;
      changed = true;
    }
  });

  if (changed) {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(stored));
    } catch {
      // sessionStorage unavailable (private mode); attribution is best-effort
    }
  }

  return stored;
}
