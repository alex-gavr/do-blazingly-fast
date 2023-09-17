import doConversion from '@utils/doConversion';
import fetchAndOpenUrls from '@utils/linksHelpers/fetchAndOpenUrls';
import { getExitLinkFromBackendWithRotationInMarker } from '@utils/linksHelpers/getExitLinkFromBackendWithRotationInMarker';
import { getIppIfErrorGetOnclick } from '@utils/linksHelpers/getIppIfErrorGetOnclick';

import justLog from './justLog';
import makeExitUrl, { ExitType } from './linksHelpers/makeExitUrl';
import openUrls from './linksHelpers/openUrls';

type TMainExit = {
  executeConversion?: boolean;
};

type WithRotationInMarker = TMainExit & {
  type: 'withRotationInMarker';
  ippZones: number[];
  onclickZones?: number[];
};

type NoRotationInMarker = TMainExit & {
  type: 'noRotationInMarker';
  onclickZones: number[];
  ippZones: number[];
};

type JustOnclick = TMainExit & {
  type: 'justOnclick';
  onclickZones: number[];
  ippZones?: number[];
};

type TExecuteExitFlow = WithRotationInMarker | NoRotationInMarker | JustOnclick;

export default async function executeExitFlow({ type, ippZones, onclickZones, executeConversion = false }: TExecuteExitFlow) {
  if (executeConversion) {
    doConversion();
  }

  if (type === 'withRotationInMarker') {
    const exitUrlPromises = ippZones.map((zone) => getExitLinkFromBackendWithRotationInMarker(zone));

    await fetchAndOpenUrls(exitUrlPromises);
  }

  if (type === 'justOnclick') {
    const urls = onclickZones.map((zone) => makeExitUrl(zone, ExitType.onclick));

    openUrls({ urls });
  }

  if (type === 'noRotationInMarker') {
    if (onclickZones && ippZones.length === onclickZones.length) {
      const mergedZones = Array.from({ length: ippZones.length }, (_, index) => ({
        ipp: ippZones[index],
        onclick: onclickZones[index],
      }));

      justLog({ somethingToLog: `mergedZones: ${mergedZones}`, type: 'log' });

      const exitUrlPromises = mergedZones.map((zone) => getIppIfErrorGetOnclick(zone.ipp, zone.onclick));
      await fetchAndOpenUrls(exitUrlPromises);
    } else {
      throw new Error('ipp and onclick count must be equal');
    }
  }
}
