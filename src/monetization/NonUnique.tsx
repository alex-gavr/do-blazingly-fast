import { useStore } from '@nanostores/preact';
import { useEffect } from 'preact/hooks';
import { getCookie } from 'typescript-cookie';

import { exitsUrlsState, financeExitsState, rewardisExitsState } from '@context/state';

import generateUrlBasedOnType from '@utils/generateUrlBasedOnType';
import isIPP from '@utils/isIPP';
import { getExitLinkFromBackendWithRotationInMarker } from '@utils/linksHelpers/getExitLinkFromBackendWithRotationInMarker';
import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';
import openUrlInNewTab from '@utils/simpleFunctions/openUrlInNewTab';
import replaceCurrentUrl from '@utils/simpleFunctions/replaceCurrentUrl';

import { initBack } from './Back';

type NonUniqueProps = {};
type MarkerResponse = {
  ads: {
    click: string;
  }[];
  is_active_zone: boolean;
};

export enum IPPZones {
  tabUnderCurrentTab = 'tabUnderCurrentTab',
  teenExitNewTab = 'teenExitNewTab',
  teenExitCurrentTab = 'teenExitCurrentTab',
  mainExitCurrentTab = 'mainExitCurrentTab',
  autoExitStepNewTab = 'autoExitStepNewTab',
  autoExitStepCurrentTab = 'autoExitStepCurrentTab',
  autoExitFinalNewTab = 'autoExitFinalNewTab',
  autoExitFinalCurrentTab = 'autoExitFinalCurrentTab',
}

export type ExitUrls = {
  zoneName: keyof typeof IPPZones;
  url: string;
};

const NonUnique = ({}: NonUniqueProps) => {
  const nonUnique = getCookie('nonUnique') ?? false;
  const nonUniqueTeen = getCookie('nonUniqueTeen') ?? false;
  const nonUniqueDo = getCookie('lead') ?? false;
  const nonUniqueTeenDo = getCookie('lead-teenage') ?? false;
  const nonUniqueCrossDo = getCookie('lead-cross') ?? false;
  const nonUniqueCrossTeenDo = getCookie('lead-teenage-cross') ?? false;
  const rewardisExits = rewardisExitsState.get();
  // const exitsUrls = useStore(exitsUrlsState);

  const initNonUniqueTeen = async () => {
    const windowUrl = new URL(window.location.href);
    const disableNonUnique = windowUrl.searchParams.get('nu') ?? false;
    if (disableNonUnique) {
      return;
    }
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
    const windowUrl = new URL(window.location.href);
    const disableNonUnique = windowUrl.searchParams.get('nu') ?? false;
    if (disableNonUnique) {
      return;
    }
    // We take zone from context
    // const financeExits = financeExitsState.get();
    // const nonUniqueIpp = getRandomZoneIfArray(financeExits.ipp_not_unique);
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
    if (nonUnique || nonUniqueTeen || nonUniqueDo || nonUniqueTeenDo || nonUniqueCrossDo || nonUniqueCrossTeenDo) {
      if (nonUniqueTeen || nonUniqueTeenDo || nonUniqueCrossTeenDo) {
        initNonUniqueTeen();
      } else {
        initNonUnique();
      }
    } else {
      // fetch IPP
      const tabUnderCurrentTab = rewardisExits.tabUnder.ipp.currentTab; // 5866173
      const teenExitNewTab = rewardisExits.teen.ipp.newTab; // 5866182
      const teenExitCurrentTab = rewardisExits.teen.ipp.currentTab; // 5866192
      const mainExitCurrentTab = rewardisExits.mainExit.ipp.currentTab; // 5866165
      const autoExitStepNewTab = rewardisExits.autoexit.autoexitStep.ipp.newTab;
      const autoExitStepCurrentTab = rewardisExits.autoexit.autoexitStep.ipp.currentTab;
      const autoExitFinalNewTab = rewardisExits.autoexit.autoexitFinal.ipp.newTab;
      const autoExitFinalCurrentTab = rewardisExits.autoexit.autoexitFinal.ipp.currentTab;

      const allIPPZones = [
        tabUnderCurrentTab,
        teenExitNewTab,
        teenExitCurrentTab,
        mainExitCurrentTab,
        autoExitStepNewTab,
        autoExitStepCurrentTab,
        autoExitFinalNewTab,
        autoExitFinalCurrentTab,
      ].join(';');

      const getIPP = async () => {
        const windowUrl = new URL(window.location.href);
        const url = new URL(import.meta.env.PUBLIC_MARKER_DOMAIN_ROTATION);
        url.searchParams.set('zz', allIPPZones);
        url.searchParams.set('var', windowUrl.searchParams.get('z') ?? '');
        url.searchParams.set('ymid', windowUrl.searchParams.get('var') ?? '');
        url.searchParams.set('ab2r', windowUrl.searchParams.get('abtest') ?? '');
        url.searchParams.set('var_3', windowUrl.searchParams.get('var_3') ?? '');

        try {
          const res = await fetch(url.href);
          const data = (await res.json()) as MarkerResponse;

          const exitUrls: ExitUrls[] = [];
          data.ads.map((ad, index) => {
            const { click } = ad;
            const isUrlIPP = isIPP(click);
            if (isUrlIPP) {
              const zoneName = Object.keys(IPPZones)[index] as keyof typeof IPPZones;
              const url = generateUrlBasedOnType(click, 'ipp');
              exitUrls.push({ zoneName, url });
            } else {
              const zoneName = Object.keys(IPPZones)[index] as keyof typeof IPPZones;
              const url = generateUrlBasedOnType(click, 'onclick');
              exitUrls.push({ zoneName, url });
            }
          });
          exitsUrlsState.set({
            exitsUrls: exitUrls,
          });
          // dispatch({ type: ActionsType.setExitUrls, payload: exitUrls });
        } catch (error: any) {
          throw new Error(error);
        }
      };
      getIPP();
    }
  }, []);

  return null;
};

export default NonUnique;
