import { db } from '@db/db';
import { webVitals, type TWebVitals } from '@db/schema';
import { findBestMatchingLocale } from '@utils/languageDetection';
import type { APIRoute } from 'astro';
import { defaultLocale } from 'src/config';
import { UAParser } from 'ua-parser-js';

export const post: APIRoute = async ({ request }) => {
  const { headers } = request;
  const auth = headers.get('Authorization');

  if (auth !== import.meta.env.PUBLIC_API_ROUTE_SECRET) {
    return Response.json({ response: 'Unauthorized, fuck off', status: 401 });
  }

  const webVitalsData = (await request.json()) as TWebVitals;

  const getLocale = () => {
    const matchedLocale = findBestMatchingLocale(request.headers.get('Accept-Language') || defaultLocale);
    return matchedLocale;
  };

  const language = getLocale();

  // UA Parsing
  const UA = request.headers.get('user-agent') ?? undefined;
  const parser = UAParser(UA);

  const browserName = parser.browser.name;
  const browserVersion = parser.browser.version;
  const osName = parser.os.name;
  const osVersion = parser.os.version;
  const deviceVendor = parser.device.vendor;
  const deviceType = parser.device.type;

  try {
    const res = await db.insert(webVitals).values({
      id: webVitalsData.id,
      geo: webVitalsData.geo,
      pathname: webVitalsData.pathname,
      offer: webVitalsData.offer,
      hosting: 'vercel',
      name: webVitalsData.name,
      value: webVitalsData.value,
      rating: webVitalsData.rating,
      delta: webVitalsData.delta,
      navigationType: webVitalsData.navigationType,
      lang: language,
      browserName,
      browserVersion,
      osName,
      osVersion,
      deviceVendor,
      deviceType,
    });

    return Response.json({ res: res });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Error on '/web-vitals': " + error, status: 400 });
  }
};
