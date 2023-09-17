import { useEffect } from 'preact/hooks';
import { getCookie } from 'typescript-cookie';

import { financeExitsState } from '@context/state';

import executeExitFlow from '@utils/executeExitFlow';

const NonUnique = () => {
  const nonUnique = getCookie('nonUnique') ?? false;
  const nonUniqueTeen = getCookie('nonUniqueTeen') ?? false;
  const nonUniqueDo = getCookie('lead') ?? false;
  const nonUniqueTeenDo = getCookie('lead-teenage') ?? false;
  const nonUniqueCrossDo = getCookie('lead-cross') ?? false;
  const nonUniqueCrossTeenDo = getCookie('lead-teenage-cross') ?? false;

  const initNonUniqueTeen = async () => {
    const financeExits = financeExitsState.get();
    const nonUniqueTeenIpp = financeExits.ipp_not_unique_teen;

    await executeExitFlow({
      type: 'withRotationInMarker',
      ippZones: [nonUniqueTeenIpp, nonUniqueTeenIpp],
    });
  };

  const initNonUnique = async () => {
    const { getRandomZone } = await import('@utils/simpleFunctions/getRandomZone');

    const financeExits = financeExitsState.get();
    const nonUniqueIpp = getRandomZone(financeExits.ipp_not_unique);
    await executeExitFlow({
      type: 'withRotationInMarker',
      ippZones: [nonUniqueIpp, nonUniqueIpp],
    });
  };

  useEffect(() => {
    if (nonUnique || nonUniqueTeen || nonUniqueDo || nonUniqueTeenDo || nonUniqueCrossDo || nonUniqueCrossTeenDo) {
      if (nonUniqueTeen || nonUniqueTeenDo || nonUniqueCrossTeenDo) {
        initNonUniqueTeen();
      } else {
        initNonUnique();
      }
    }
  }, []);

  return null;
};

export default NonUnique;
