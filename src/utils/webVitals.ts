import { Metric, onLCP, onFCP, onTTFB, onFID, onINP, onCLS } from 'web-vitals';
import production from '@utils/isProduction';

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
    onCLS((metric) => sendWebVitals({ metric, geo, pathname, offer }));
    // First Input Delay (FID) | IDC
    onFID((metric) => sendWebVitals({ metric, geo, pathname, offer }));
    // Interaction to next Paint (INP) | IDC
    onINP((metric) => sendWebVitals({ metric, geo, pathname, offer }));
  }
}

interface IProps {
  metric: Metric;
  geo: string;
  pathname: string;
  offer: string;
}

function sendWebVitals({ metric, geo, pathname, offer }: IProps) {
  const data = {
    id: metric.id,
    geo: geo,
    pathname: pathname,
    offer: offer,
    name: metric.name,
    value: Math.round(metric.value),
    rating: metric.rating,
    delta: Math.round(metric.delta),
    navigationType: metric.navigationType,
  };
  const options = {
    method: 'POST',
    headers: {
      Authorization: import.meta.env.PUBLIC_API_ROUTE_SECRET,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch('/web-vitals', options).catch((error) => console.error(error));
}
