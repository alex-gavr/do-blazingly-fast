import { setCookie } from 'typescript-cookie';

import debug from './isDebug';
import production from './isProduction';

const doConversion = () => {
  if (typeof window !== 'undefined') {
    if (production) {
      const url = new URL(window.location.href);
      const subId = url.searchParams.get('s');
      const conversionUrl = `https://ad.propellerads.com/conversion.php?visitor_id=${subId}`;
      if (navigator.sendBeacon) {
        navigator.sendBeacon(conversionUrl);
      } else {
        fetch(conversionUrl, { method: 'POST', keepalive: true });
      }
      !debug && setCookie('nonUnique', 'true', { expires: 7, path: '' });
    } else {
      console.log('conversion is fired');
    }
  } else {
    throw new Error('window is undefined');
  }
};

export default doConversion;
