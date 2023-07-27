import { useEffect, useState } from 'preact/hooks';
import production from '@utils/isProduction';
import debug from '@src/utils/isDebug';
import { getCookie } from 'typescript-cookie';
import { getRandomZone } from '@src/utils/getRandomZone';
import exitZones from '@src/config/2025';
import { getExitLinkFromBackend } from '@src/utils/getExitLinkFromBackend';

// const THIRTY_SECONDS = 30;
// const FORTY_SECONDS = 40;

const AutoExitForNonUniqueTest = () => {
  const [count, setCount] = useState(10);

  const nonUniqueTeen = getCookie('nonUniqueTeen') ?? false;
  const nonUniqueTeenDo = getCookie('lead-teenage') ?? false;
  const nonUniqueCrossTeenDo = getCookie('lead-teenage-cross') ?? false;

  const defaultAutoExit = async () => {
    if (production && !debug) {
      if (nonUniqueTeen || nonUniqueTeenDo || nonUniqueCrossTeenDo) {
        const nonUniqueTeenIpp = exitZones.ipp_not_unique_teen;
        const url = await getExitLinkFromBackend(nonUniqueTeenIpp);

        window.open(url, '_blank');
        window.location.replace(url);
      } else {
        const nonUniqueIpp = getRandomZone(exitZones.ipp_not_unique);
        const url = await getExitLinkFromBackend(nonUniqueIpp);

        window.open(url, '_blank');
        window.location.replace(url);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);
    if (count === 0) {
      defaultAutoExit();
    }

    return () => clearInterval(interval);
  }, [count]);

  return null;
};

export default AutoExitForNonUniqueTest;
