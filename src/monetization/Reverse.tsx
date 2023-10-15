import { useStore } from '@nanostores/preact';
import { useEffect } from 'preact/hooks';

import { prefetchUrlsState, rewardisExitsState } from '@context/state';

import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';
import replaceCurrentUrl from '@utils/simpleFunctions/replaceCurrentUrl';

import { initBack } from './Back';

interface IReverseProps {}

const Reverse = ({}: IReverseProps) => {
  const pathname = window.location.pathname;
  const searchParams = window.location.search;
  const pathnameWithSearchParams = `${pathname}${searchParams}`;
  const { reverse } = useStore(prefetchUrlsState);

  useEffect(() => {
    if (production && !debug) {
      // due to pathname below static finance survey doesn't have reverse
      history.pushState(null, 'Finance Survey', `${pathnameWithSearchParams}`);

      const handleBackButton = async (event: PopStateEvent) => {
        event.preventDefault();
        // This is zone from context
        // const financeExits = financeExitsState.get();
        // const zoneFromStore = getRandomZoneIfArray(financeExits.onclick_reverse_zone);

        if (reverse?.collectImpression) {
          reverse.collectImpression();
        }

        if (reverse?.url) {
          initBack();
          replaceCurrentUrl(reverse.url);
        } else {
          const rewardisExits = rewardisExitsState.get();
          const zone = rewardisExits.reverse.onclick.currentTab;

          const url = makeExitUrl(zone, ExitType.onclick);
          initBack();
          replaceCurrentUrl(url);
        }
      };

      window.addEventListener('popstate', handleBackButton);

      return () => {
        window.removeEventListener('popstate', handleBackButton);
      };
    }
  }, []);

  return null;
};

export default Reverse;
