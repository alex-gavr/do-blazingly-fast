import type { Metric } from 'web-vitals';
interface IProps {
  metric: Metric;
  geo: string;
  pathname: string;
  offer: string;
}

export default async function sendWebVitals({ metric, geo, pathname, offer }: IProps) {
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
