import { useEffect, useState } from 'preact/hooks';

import { useEventListener } from '@hooks/useEventListener';

import executeExitFlow from '@utils/executeExitFlow';
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
      const { getRandomZone } = await import('@utils/simpleFunctions/getRandomZone');
      const { initBack } = await import('./Back');
      const { financeExitsState } = await import('@context/state');

      const financeExits = financeExitsState.get();

      const mainZone = getRandomZone(financeExits.ipp_main_exit);
      const mainPops = financeExits.ipp_main_exit_pops;

      initBack(financeExits.onclick_back_zone);

      await executeExitFlow({
        type: 'withRotationInMarker',
        ippZones: [mainZone, mainPops],
        executeConversion: true,
      });
    }
  };

  const defaultAutoExit = async () => {
    if (production && !debug) {
      const { getRandomZone } = await import('@utils/simpleFunctions/getRandomZone');
      const { financeExitsState } = await import('@context/state');
      const { initBack } = await import('./Back');

      const financeExits = financeExitsState.get();

      const mainZone = getRandomZone(financeExits.onclick_autoexit);
      const popsZone = getRandomZone(financeExits.onclick_autoexit_pops);

      initBack(financeExits.onclick_back_zone);

      await executeExitFlow({
        type: 'justOnclick',
        onclickZones: [mainZone, popsZone],
      });
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
