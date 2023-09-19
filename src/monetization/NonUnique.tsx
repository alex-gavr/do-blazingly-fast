import { useEffect } from 'preact/hooks';
import { getCookie } from 'typescript-cookie';

import { financeExitsState } from '@context/state';

import { useClientSearchParams } from '@hooks/useClientSearchParams';

import executeExitFlow from '@utils/executeExitFlow';
import { getRandomZoneIfArray } from '@utils/simpleFunctions/getRandomZoneIfArray';

const NonUnique = () => {
  const { nonUnique: nonUniqueSearchParam } = useClientSearchParams();
  const nonUnique = getCookie('nonUnique') ?? false;
  const nonUniqueTeen = getCookie('nonUniqueTeen') ?? false;
  const nonUniqueDo = getCookie('lead') ?? false;
  const nonUniqueTeenDo = getCookie('lead-teenage') ?? false;
  const nonUniqueCrossDo = getCookie('lead-cross') ?? false;
  const nonUniqueCrossTeenDo = getCookie('lead-teenage-cross') ?? false;

  const initNonUniqueTeen = () => {
    const financeExits = financeExitsState.get();
    const nonUniqueTeenIpp = financeExits.ipp_not_unique_teen;

    executeExitFlow({
      type: 'withRotationInMarker',
      ippZones: [nonUniqueTeenIpp, nonUniqueTeenIpp],
    });
  };

  const initNonUnique = () => {
    const financeExits = financeExitsState.get();
    const nonUniqueIpp = getRandomZoneIfArray(financeExits.ipp_not_unique);
    executeExitFlow({
      type: 'withRotationInMarker',
      ippZones: [nonUniqueIpp, nonUniqueIpp],
    });
  };

  useEffect(() => {
    if (nonUniqueSearchParam !== '0') {
      if (nonUnique || nonUniqueTeen || nonUniqueDo || nonUniqueTeenDo || nonUniqueCrossDo || nonUniqueCrossTeenDo) {
        if (nonUniqueTeen || nonUniqueTeenDo || nonUniqueCrossTeenDo) {
          initNonUniqueTeen();
        } else {
          initNonUnique();
        }
      }
    }
  }, []);

  return null;
};

export default NonUnique;
