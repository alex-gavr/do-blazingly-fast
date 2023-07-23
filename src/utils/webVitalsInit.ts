import { onLCP, onFCP, onTTFB } from 'web-vitals';
import production from '@utils/isProduction';
import sendWebVitals from '@utils/webVitals';

let debug: boolean = false;
if (typeof window !== 'undefined') {
  const url = new URL(window.location.href);
  const geo = url.searchParams.get('geo') ?? '??';
  const offer = url.searchParams.get('offer_id') ?? '??';
  const pathname = url.pathname;
  debug = url.searchParams.get('debug') ? true : false;

  if (production && !debug) {
    // Largest Contentful Paint (LCP)
    onLCP((metric) => sendWebVitals({ metric, geo, pathname, offer }));
    // First Contentful Paint (FCP)
    onFCP((metric) => sendWebVitals({ metric, geo, pathname, offer }));
    // Time to First Byte (TTFB)
    onTTFB((metric) => sendWebVitals({ metric, geo, pathname, offer }));
    // Cumulative Layout Shift (CLS) | IDC
    // onCLS((metric) => sendWebVitals({ metric, geo, pathname, offer }));
    // First Input Delay (FID) | IDC
    // onFID((metric) => sendWebVitals({ metric, geo, pathname, offer }));
    // Interaction to next Paint (INP) | IDC
    // onINP((metric) => sendWebVitals({ metric, geo, pathname, offer }));
  }
}
