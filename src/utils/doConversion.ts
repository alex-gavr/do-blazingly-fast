import { setCookie } from 'typescript-cookie';

import justLog from './justLog';
import debug from './simpleFunctions/isDebug';
import production from './simpleFunctions/isProduction';

const doConversion = () => {
  if (typeof window !== 'undefined') {
    if (production) {
      const url = new URL(window.location.href);
      const subId = url.searchParams.get('s');
      const conversionUrl = `${import.meta.env.PUBLIC_CONVERSION_URL}${subId}`;
      if (navigator.sendBeacon) {
        navigator.sendBeacon(conversionUrl);
      } else {
        fetch(conversionUrl, { method: 'POST', keepalive: true });
      }
      production && !debug && setCookie('nonUnique', 'true', { expires: 7, path: '' });
    } else {
      justLog({ somethingToLog: 'conversion is fired', type: 'log' });
    }
  } else {
    throw new Error('window is undefined');
  }
};

export default doConversion;
