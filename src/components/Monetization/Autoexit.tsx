import { useEffect, useState } from 'preact/hooks';
import { useEventListener } from '@utils/useEventListener';
import production from '@utils/isProduction';
import debug from '@src/utils/isDebug';

const THIRTY_SECONDS = 30;
// const FORTY_SECONDS = 40;

const AutoExit = () => {
  const [count, setCount] = useState(THIRTY_SECONDS);

  // AUTO-EXIT
  const updateCount = () => {
    setCount(THIRTY_SECONDS);
  };

  const autoExitWithConversion = async () => {
    if (production && !debug) {
      const { default: doConversion } = await import('@src/utils/doConversion');
      const { getRandomZone } = await import('@src/utils/getRandomZone');
      const { getExitLinkFromBackend } = await import('@src/utils/getExitLinkFromBackend');
      const { initBack } = await import('./Back');
      const { financeExitsState } = await import('@context/state');

      doConversion();

      const financeExits = financeExitsState.get();

      const mainZone = getRandomZone(financeExits.ipp_main_exit);
      const mainPops = financeExits.ipp_main_exit_pops;

      const main = getExitLinkFromBackend(mainZone);
      const pops = getExitLinkFromBackend(mainPops);

      const [mainUrl, popsUrl] = await Promise.all([main, pops]);

      initBack(financeExits.onclick_back_zone);
      window.open(mainUrl, '_blank');
      window.location.replace(popsUrl);
    }
  };

  const defaultAutoExit = async () => {
    if (production && !debug) {
      const { getRandomZone } = await import('@src/utils/getRandomZone');
      const { default: makeExitUrl, ExitType } = await import('@src/utils/makeExitUrl');
      const { financeExitsState } = await import('@context/state');
      const { initBack } = await import('./Back');
      // const { setCookie } = await import('typescript-cookie');

      const financeExits = financeExitsState.get();

      const mainZone = getRandomZone(financeExits.onclick_autoexit);
      const popsZone = getRandomZone(financeExits.onclick_autoexit_pops);
      const main = makeExitUrl(mainZone, ExitType.onclick);
      const pops = makeExitUrl(popsZone, ExitType.onclick);

      // We redirect to non-unique users who came back within 30 minutes
      // const in30Minutes = 1 / 48;
      // setCookie('autoExit', 'true', { expires: in30Minutes, path: '' });
      initBack(financeExits.onclick_back_zone);
      window.open(main, '_blank');
      window.location.replace(pops);
    }
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
        // Cos of pathname we lose conversions on static pages here
        if (pathname === '/thank-you') {
          autoExitWithConversion();
        } else {
          defaultAutoExit();
        }
      }
    }

    return () => clearInterval(interval);
  }, [count]);

  return null;
};

export default AutoExit;
