import { useEffect, useState } from 'preact/hooks';
import { useEventListener } from '@utils/useEventListener';
import exitZones from '@config/2025';
// import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import { initBack } from './Back';
import makeExitUrl, { ExitType } from '@utils/makeExitUrl';
import production from '@utils/isProduction';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import { getRandomZone } from '@utils/getRandomZone';
import { setCookie } from 'typescript-cookie';
import doConversion from '@src/utils/doConversion';

const THIRTY_SECONDS = 30;
// const FORTY_SECONDS = 40;

const AutoExit = () => {
  const [count, setCount] = useState(THIRTY_SECONDS);

  // AUTO-EXIT
  const updateCount = () => {
    setCount(THIRTY_SECONDS);
  };

  useEventListener('mousemove', updateCount);
  useEventListener('click', updateCount);
  useEventListener('scroll', updateCount);
  useEventListener('touchmove', updateCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);
    if (count === 0) {
      if (typeof window !== 'undefined') {
        const pathname = window.location.pathname;
        if (pathname === '/thank-you') {
          if (production) {
            doConversion();

            const triggerExit = async () => {
              const mainZone = getRandomZone(exitZones.ipp_main_exit);
              const mainPops = exitZones.ipp_main_exit_pops;

              const main = getExitLinkFromBackend(mainZone);
              const pops = getExitLinkFromBackend(mainPops);

              const [mainUrl, popsUrl] = await Promise.all([main, pops]);

              initBack(exitZones.onclick_back_zone);
              window.open(mainUrl, '_blank');
              window.location.replace(popsUrl);
            };
            triggerExit();
          } else {
            console.log(`autoexit conversion`);
          }
        } else {
          const mainZone = getRandomZone(exitZones.onclick_autoexit);
          const popsZone = getRandomZone(exitZones.onclick_autoexit_pops);
          const main = makeExitUrl(mainZone, ExitType.onclick);
          const pops = makeExitUrl(popsZone, ExitType.onclick);

          // We redirect to non-unique users who came back within 30 minutes
          const in30Minutes = 1 / 48;
          setCookie('autoExit', 'true', { expires: in30Minutes, path: '' });
          initBack(exitZones.onclick_back_zone);
          window.open(main, '_blank');
          window.location.replace(pops);
        }
      }
    }

    return () => clearInterval(interval);
  }, [count]);

  return null;
};

export default AutoExit;
