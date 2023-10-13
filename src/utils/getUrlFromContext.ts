import type { IPPZones } from '@monetization/NonUnique';

import { exitsUrlsState, rewardisExitsState } from '@context/state';

import makeExitUrl, { ExitType } from './linksHelpers/makeExitUrl';

export default function getUrlFromContextBasedOnZone({ exitZone }: { exitZone: keyof typeof IPPZones }): string {
  const exitsUrls = exitsUrlsState.get();

  const currentTab = exitsUrls.exitsUrls.find((exit) => exit.zoneName === exitZone);
  if (currentTab !== undefined) {
    return currentTab.url;
  } else {
    const rewardisExits = rewardisExitsState.get();
    return makeExitUrl(rewardisExits.noZoneFallback.onclick.currentTab, ExitType.onclick);
  }
}
