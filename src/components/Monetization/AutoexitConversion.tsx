import production from '@utils/isProduction';
import { useEffect, useState } from 'preact/hooks';
import { setCookie } from 'typescript-cookie';
import { initBack } from './Back';
import exitZones from '@config/2025';
import makeExitUrl, { ExitType } from '@utils/makeExitUrl';

interface IAutoexitConversionProps {
  mainUrl: string;
  popsUrl: string;
}

const AutoexitConversion = ({ mainUrl, popsUrl }: IAutoexitConversionProps) => {
  const TWENTY_SECONDS = 25;
  const THIRTY_SECONDS = 30;
  // const FORTY_SECONDS = 40;

  const [count, setCount] = useState(TWENTY_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);
    if (count === 0) {
      if (mainUrl.length > 1) {
        if (production) {
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            const subId = url.searchParams.get('s');
            const conversionUrl = `https://ad.propellerads.com/conversion.php?visitor_id=${subId}`;
            window.navigator.sendBeacon(conversionUrl);
            setCookie('nonUnique', '1', { expires: 7, path: '' });
          }
          initBack(exitZones.onclick_back_zone);
          window.open(mainUrl, '_blank');
          window.location.replace(popsUrl);
        } else {
          console.log('autoExit With conversion');
          console.log(`mainUrl = `, mainUrl);
          console.log(`popsUrl = `, popsUrl);
        }
      } else {
        console.error('Main url is empty, fallback on onclick');
        const url = makeExitUrl(exitZones.onclick_main_exit[0], ExitType.onclick);
        initBack(exitZones.onclick_back_zone);
        window.open(url, '_blank');
        window.location.replace(url);
      }
    }

    return () => clearInterval(interval);
  }, [count]);

  return null;
};

export default AutoexitConversion;
