import { onLCP, onFCP, onTTFB } from 'web-vitals';
import production from '@utils/isProduction';
import sendWebVitals from '@utils/webVitals';
import sendWebVitalsAbTest from './webVitalsAbTest';

let debug: boolean = false;
if (typeof window !== 'undefined') {
  const url = new URL(window.location.href);
  const geo = url.searchParams.get('geo') ?? '??';
  const offer = url.searchParams.get('offer_id') ?? '??';
  const abtest = url.searchParams.get('abtest') ?? '??';
  const pathname = url.pathname;
  debug = url.searchParams.get('debug') ? true : false;

  if (production && !debug) {
    if (abtest === '260769000' || abtest === '260769222' || abtest === '260769444') {
      onLCP((metric) => sendWebVitalsAbTest({ metric, geo, pathname, offer, output: 'edge' }));
      // First Contentful Paint (FCP)
      onFCP((metric) => sendWebVitalsAbTest({ metric, geo, pathname, offer, output: 'edge' }));
      // Time to First Byte (TTFB)
      onTTFB((metric) => sendWebVitalsAbTest({ metric, geo, pathname, offer, output: 'edge' }));
    } else if (abtest === '260769111' || abtest === '260769333' || abtest === '260769555') {
      onLCP((metric) => sendWebVitalsAbTest({ metric, geo, pathname, offer, output: 'static' }));
      // First Contentful Paint (FCP)
      onFCP((metric) => sendWebVitalsAbTest({ metric, geo, pathname, offer, output: 'static' }));
      // Time to First Byte (TTFB)
      onTTFB((metric) => sendWebVitalsAbTest({ metric, geo, pathname, offer, output: 'static' }));
    } else {
      onLCP((metric) => sendWebVitals({ metric, geo, pathname, offer }));

      onFCP((metric) => sendWebVitals({ metric, geo, pathname, offer }));

      onTTFB((metric) => sendWebVitals({ metric, geo, pathname, offer }));
    }
  }
}
