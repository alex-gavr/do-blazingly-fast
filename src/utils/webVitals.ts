import { Metric, onLCP, onFCP, onTTFB, onFID, onINP, onCLS } from 'web-vitals';
import { db } from '@db/db';
import { webVitals } from '@db/schema';
import production from '@utils/isProduction';
import UAParser from 'ua-parser-js';

let debug: boolean = false;
if (typeof window !== 'undefined') {
  const userLanguage = navigator.language.split('-')[0];
  const url = new URL(window.location.href);
  const geo = url.searchParams.get('geo') ?? '??';
  const pathname = url.pathname;
  debug = url.searchParams.get('debug') ? true : false;

  const parser = UAParser(navigator.userAgent);
  console.log('🚀 ~ parser:', parser)

  const browserName = parser.browser.name;
  const browserVersion = parser.browser.version;
  const osName = parser.os.name;
  const osVersion = parser.os.version;
  const deviceVendor = parser.device.vendor;
  const deviceType = parser.device.type;

  function sendToAnalytics(metric: Metric) {
    try {
      db.insert(webVitals).values({
        id: metric.id,
        geo: geo,
        pathname: pathname,
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
        delta: metric.delta,
        navigationType: metric.navigationType,
        lang: userLanguage,
        browserName,
        browserVersion,
        osName,
        osVersion,
        deviceVendor,
        deviceType,
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (production && !debug) {
    // Largest Contentful Paint (LCP)
    onLCP(sendToAnalytics);
    // First Contentful Paint (FCP)
    onFCP(sendToAnalytics);
    // Time to First Byte (TTFB)
    onTTFB(sendToAnalytics);
    // Cumulative Layout Shift (CLS) | IDC
    onCLS(sendToAnalytics);
    // First Input Delay (FID) | IDC
    onFID(sendToAnalytics);
    // Interaction to next Paint (INP) | IDC
    onINP(sendToAnalytics);
  }
}
