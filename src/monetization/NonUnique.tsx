import { useEffect } from 'preact/hooks';
import { getCookie } from 'typescript-cookie';

import { financeExitsState, rewardisExitsState } from '@context/state';

import { useClientSearchParams } from '@hooks/useClientSearchParams';

import executeExitFlow, { ExitFlowType } from '@utils/executeExitFlow';
import { getRandomZoneIfArray } from '@utils/simpleFunctions/getRandomZoneIfArray';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';

type NonUniqueProps = {
  zone: number | number[] | undefined;
  zonePops: number | number[] | undefined;
  zoneTeen: number | number[] | undefined;
  zoneTeenPops: number | number[] | undefined;
  disabled?: boolean;
};

const NonUnique = ({ disabled, zone, zonePops, zoneTeen, zoneTeenPops }: NonUniqueProps) => {
  const { nonUnique: nonUniqueSearchParam } = useClientSearchParams();

  const nonUniqueDisabled = disabled || nonUniqueSearchParam === '0' || !production || debug;

  const nonUnique = getCookie('nonUnique') ?? false;
  const nonUniqueTeen = getCookie('nonUniqueTeen') ?? false;
  const nonUniqueDo = getCookie('lead') ?? false;
  const nonUniqueTeenDo = getCookie('lead-teenage') ?? false;
  const nonUniqueCrossDo = getCookie('lead-cross') ?? false;
  const nonUniqueCrossTeenDo = getCookie('lead-teenage-cross') ?? false;

  const initNonUniqueTeen = () => {
    // const financeExits = financeExitsState.get();
    // const nonUniqueTeenIpp = financeExits.ipp_not_unique_teen;
    const rewardisExits = rewardisExitsState.get();
    const nonUniqueTeenIpp = rewardisExits.nonUnique.teen.ipp.currentTab;

    if (zoneTeen !== undefined && zoneTeenPops !== undefined) {
      const zoneTeenFromProps = getRandomZoneIfArray(zoneTeen);
      const zoneTeenPopsFromProps = getRandomZoneIfArray(zoneTeenPops);
      executeExitFlow({
        type: ExitFlowType.withRotationInMarker,
        ippZones: [nonUniqueTeenIpp || zoneTeenFromProps, nonUniqueTeenIpp || zoneTeenPopsFromProps],
      });
    }
  };

  const initNonUnique = () => {
    // We take zone from context
    // const financeExits = financeExitsState.get();
    // const nonUniqueIpp = getRandomZoneIfArray(financeExits.ipp_not_unique);
    const rewardisExits = rewardisExitsState.get();
    const nonUniqueIpp = rewardisExits.nonUnique.ipp.currentTab;
    if (zone !== undefined && zonePops !== undefined) {
      const zoneFromProps = getRandomZoneIfArray(zone);
      const zonePopsFromProps = getRandomZoneIfArray(zonePops);
      executeExitFlow({
        type: ExitFlowType.withRotationInMarker,
        ippZones: [nonUniqueIpp || zoneFromProps, nonUniqueIpp || zonePopsFromProps],
      });
    }
  };

  useEffect(() => {
    if (!nonUniqueDisabled) {
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
