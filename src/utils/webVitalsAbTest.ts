import type { Metric } from 'web-vitals';

interface ISendWebVitalsAbTest {
  metric: Metric;
  geo: string;
  pathname: string;
  offer: string;
  output: 'static' | 'edge';
}

export default async function sendWebVitalsAbTest({ metric, geo, pathname, offer, output }: ISendWebVitalsAbTest) {
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
    output: output,
  };
  const options = {
    method: 'POST',
    headers: {
      Authorization: import.meta.env.PUBLIC_API_ROUTE_SECRET,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch('/api/test', options).catch((error) => console.error(error));
}
