import { initBack } from '@monetization/Back';
import { Cookies } from 'typescript-cookie';

import doConversion from '@utils/doConversion';
import fetchAndOpenUrls from '@utils/linksHelpers/fetchAndOpenUrls';
import { getExitLinkFromBackendWithRotationInMarker } from '@utils/linksHelpers/getExitLinkFromBackendWithRotationInMarker';
import { getIppIfErrorGetOnclick } from '@utils/linksHelpers/getIppIfErrorGetOnclick';

import justLog from './justLog';
import makeExitUrl, { ExitType } from './linksHelpers/makeExitUrl';
import openUrls from './linksHelpers/openUrls';
import production from './simpleFunctions/isProduction';
import openUrlInNewTab from './simpleFunctions/openUrlInNewTab';
import replaceCurrentUrl from './simpleFunctions/replaceCurrentUrl';

export enum ExitFlowType {
  withRotationInMarker = 'withRotationInMarker',
  noRotationInMarker = 'noRotationInMarker',
  justOnclick = 'justOnclick',
  rewardis = 'rewardis',
}

type TMainExit = {
  executeConversion?: boolean;
};

type WithRotationInMarker = TMainExit & {
  type: ExitFlowType.withRotationInMarker;
  ippZones: number[];
  onclickZones?: number[];
  rewardisUrl?: string;
  nonUnique?: boolean;
};

type NoRotationInMarker = TMainExit & {
  type: ExitFlowType.noRotationInMarker;
  onclickZones: number[];
  ippZones: number[];
  rewardisUrl?: string;
  nonUnique?: boolean;
};

type JustOnclick = TMainExit & {
  type: ExitFlowType.justOnclick;
  onclickZones: number[];
  ippZones?: number[];
  rewardisUrl?: string;
  nonUnique?: boolean;
};

type TRewardis = TMainExit & {
  type: ExitFlowType.rewardis;
  onclickZones: number;
  ippZones: number;
  rewardisUrl: string;
  nonUnique?: boolean;
};

type TExecuteExitFlow = WithRotationInMarker | NoRotationInMarker | JustOnclick | TRewardis;

export default async function executeExitFlow({
  type,
  ippZones,
  onclickZones,
  rewardisUrl,
  executeConversion = false,
  nonUnique = false,
}: TExecuteExitFlow): Promise<void> {
  if (executeConversion) {
    doConversion();
  }

  initBack();

  if (type === ExitFlowType.withRotationInMarker) {
    const exitUrlPromises = ippZones.map((zone) => getExitLinkFromBackendWithRotationInMarker(zone));

    await fetchAndOpenUrls(exitUrlPromises);
  }

  if (type === ExitFlowType.justOnclick) {
    const urls = onclickZones.map((zone) => makeExitUrl(zone, ExitType.onclick));
    // console.log('justOnclick urls:', urls);

    openUrls({ urls });
  }

  if (type === ExitFlowType.rewardis) {
    const urlExit = await getExitLinkFromBackendWithRotationInMarker(ippZones);
    // console.log('🚀 ~ urlExit:', urlExit);

    if (urlExit instanceof Error) {
      openUrlInNewTab(rewardisUrl);
      replaceCurrentUrl(makeExitUrl(onclickZones, ExitType.onclick));
    } else {
      openUrlInNewTab(rewardisUrl);
      replaceCurrentUrl(urlExit);
    }
    production && nonUnique && Cookies.set('nonUnique', 'true', { expires: 7 });
  }

  if (type === ExitFlowType.noRotationInMarker) {
    if (onclickZones && ippZones.length === onclickZones.length) {
      const mergedZones = Array.from({ length: ippZones.length }, (_, index) => ({
        ipp: ippZones[index],
        onclick: onclickZones[index],
      }));

      console.log('NoRotationInMarker mergedZones', mergedZones);

      const exitUrlPromises = mergedZones.map((zone) => getIppIfErrorGetOnclick(zone.ipp, zone.onclick));

      await fetchAndOpenUrls(exitUrlPromises);
    } else {
      throw new Error('ipp and onclick count must be equal');
    }
  }
}
