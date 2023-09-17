import { useEffect, useState } from 'preact/hooks';

import { useEventListener } from '@hooks/useEventListener';

import fetchAndOpenUrls from '@utils/linksHelpers/fetchAndOpenUrls';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';

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
      const { default: doConversion } = await import('@utils/doConversion');
      const { getRandomZone } = await import('@utils/simpleFunctions/getRandomZone');
      const { getExitLinkFromBackendWithRotationInMarker } = await import('@utils/linksHelpers/getExitLinkFromBackendWithRotationInMarker');
      const { initBack } = await import('./Back');
      const { financeExitsState } = await import('@context/state');

      doConversion();

      const financeExits = financeExitsState.get();

      const mainZone = getRandomZone(financeExits.ipp_main_exit);
      const mainPops = financeExits.ipp_main_exit_pops;

      const main = getExitLinkFromBackendWithRotationInMarker(mainZone);
      const pops = getExitLinkFromBackendWithRotationInMarker(mainPops);

      initBack(financeExits.onclick_back_zone);
      await fetchAndOpenUrls([main, pops]);
    }
  };

  const defaultAutoExit = async () => {
    if (production && !debug) {
      const { getRandomZone } = await import('@utils/simpleFunctions/getRandomZone');
      const { default: makeExitUrl, ExitType } = await import('@utils/linksHelpers/makeExitUrl');
      const { financeExitsState } = await import('@context/state');
      const { initBack } = await import('./Back');
      const { default: openUrlInNewTab } = await import('@utils/simpleFunctions/openUrlInNewTab');
      const { default: replaceCurrentUrl } = await import('@utils/simpleFunctions/replaceCurrentUrl');
      // const { setCookie } = await import('typescript-cookie');

      const financeExits = financeExitsState.get();

      const mainZone = getRandomZone(financeExits.onclick_autoexit);
      const popsZone = getRandomZone(financeExits.onclick_autoexit_pops);
      const main = makeExitUrl(mainZone, ExitType.onclick);
      const pops = makeExitUrl(popsZone, ExitType.onclick);

      initBack(financeExits.onclick_back_zone);
      openUrlInNewTab(main);
      replaceCurrentUrl(pops);
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
