import { useEffect } from 'preact/hooks';
import { getCookie } from 'typescript-cookie';

import { financeExitsState, rewardisExitsState } from '@context/state';

import { getExitLinkFromBackendWithRotationInMarker } from '@utils/linksHelpers/getExitLinkFromBackendWithRotationInMarker';
import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';
import openUrlInNewTab from '@utils/simpleFunctions/openUrlInNewTab';
import replaceCurrentUrl from '@utils/simpleFunctions/replaceCurrentUrl';

import { initBack } from './Back';

type NonUniqueProps = {};

const NonUnique = ({}: NonUniqueProps) => {
  const nonUnique = getCookie('nonUnique') ?? false;
  const nonUniqueTeen = getCookie('nonUniqueTeen') ?? false;
  const nonUniqueDo = getCookie('lead') ?? false;
  const nonUniqueTeenDo = getCookie('lead-teenage') ?? false;
  const nonUniqueCrossDo = getCookie('lead-cross') ?? false;
  const nonUniqueCrossTeenDo = getCookie('lead-teenage-cross') ?? false;

  const initNonUniqueTeen = async () => {
    const rewardisExits = rewardisExitsState.get();
    const nonUniqueTeenIpp = rewardisExits.nonUnique.teen.ipp.currentTab;
    const nonUniqueTeenOnclick = rewardisExits.nonUnique.teen.onclick.currentTab;

    const currentTab = await getExitLinkFromBackendWithRotationInMarker(nonUniqueTeenIpp);
    initBack();
    if (currentTab instanceof Error) {
      const ad = makeExitUrl(nonUniqueTeenOnclick, ExitType.onclick);
      openUrlInNewTab(ad);
      replaceCurrentUrl(ad);
    } else {
      openUrlInNewTab(currentTab);
      replaceCurrentUrl(currentTab);
    }
  };

  const initNonUnique = async () => {
    // We take zone from context
    // const financeExits = financeExitsState.get();
    // const nonUniqueIpp = getRandomZoneIfArray(financeExits.ipp_not_unique);
    const rewardisExits = rewardisExitsState.get();
    const nonUniqueIpp = rewardisExits.nonUnique.ipp.currentTab;
    const nonUniqueOnclick = rewardisExits.nonUnique.onclick.currentTab;

    const currentTab = await getExitLinkFromBackendWithRotationInMarker(nonUniqueIpp);
    initBack();
    if (currentTab instanceof Error) {
      const ad = makeExitUrl(nonUniqueOnclick, ExitType.onclick);
      openUrlInNewTab(ad);
      replaceCurrentUrl(ad);
    } else {
      openUrlInNewTab(currentTab);
      replaceCurrentUrl(currentTab);
    }
  };

  useEffect(() => {
    if (production && !debug) {
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
