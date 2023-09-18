import { setCookie } from 'typescript-cookie';

import justLog from './justLog';
import debug from './simpleFunctions/isDebug';
import production from './simpleFunctions/isProduction';

const doConversion = () => {
  if (typeof window !== 'undefined') {
    const startTime = sessionStorage.getItem('surveyStartTime');
    if (startTime) {
      const timeTaken = (Date.now() - Number(startTime)) / 1000;

      if (timeTaken < 5) {
        justLog({ somethingToLog: 'Survey completed too quickly, not triggering conversion.', type: 'log' });
        sessionStorage.removeItem('surveyStartTime');
        return; // Exit the function early, not triggering conversion
      } else {
        justLog({ somethingToLog: 'Survey completed in reasonable time, triggering conversion.', type: 'log' });
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
        sessionStorage.removeItem('surveyStartTime');
      }
    }
  } else {
    throw new Error('window is undefined');
  }
};

export default doConversion;
