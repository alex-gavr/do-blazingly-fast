import { setCookie } from 'typescript-cookie';

import doConversion from '@utils/doConversion';
import fetchAndOpenUrls from '@utils/linksHelpers/fetchAndOpenUrls';
import { getExitLinkFromBackendWithRotationInMarker } from '@utils/linksHelpers/getExitLinkFromBackendWithRotationInMarker';
import { getIppIfErrorGetOnclick } from '@utils/linksHelpers/getIppIfErrorGetOnclick';
import debug from '@utils/simpleFunctions/isDebug';

import justLog from './justLog';

type TMainExit = {
  executeConversion?: boolean;
};
type TZones = {
  ippZones: number[];
  onclickZones?: number[];
};

type WithRotationInMarker = TZones &
  TMainExit & {
    type: 'withRotationInMarker';
  };

type NoRotationInMarker = TZones &
  TMainExit & {
    type: 'noRotationInMarker';
    onclickZones: number[];
  };

type TExecuteExitFlow = WithRotationInMarker | NoRotationInMarker;

export default async function executeExitFlow({ type, ippZones, onclickZones, executeConversion = false }: TExecuteExitFlow) {
  if (executeConversion) {
    doConversion();
  }

  if (type === 'withRotationInMarker') {
    const exitUrlPromises = ippZones.map((zone) => getExitLinkFromBackendWithRotationInMarker(zone));

    await fetchAndOpenUrls(exitUrlPromises);
  }

  if (type === 'noRotationInMarker') {
    if (onclickZones && ippZones.length === onclickZones.length) {
      const mergedZones = Array.from({ length: ippZones.length }, (_, index) => ({
        ipp: ippZones[index],
        onclick: onclickZones[index],
      }));

      justLog({ text: `mergedZones: ${mergedZones}`, type: 'log' });

      const exitUrlPromises = mergedZones.map((zone) => getIppIfErrorGetOnclick(zone.ipp, zone.onclick));
      await fetchAndOpenUrls(exitUrlPromises);
    } else {
      throw new Error('ipp and onclick count must be equal');
    }
  }
}
