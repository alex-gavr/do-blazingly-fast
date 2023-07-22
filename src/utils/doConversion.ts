import { setCookie } from 'typescript-cookie';
import production from './isProduction';
import debug from './isDebug';

const doConversion = async () => {
  if (typeof window !== 'undefined' && production) {
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
    console.log(`conversion`);
  }
};

export default doConversion;
