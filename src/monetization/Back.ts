import { prefetchUrlsState, rewardisExitsState } from '@context/state';

import extractAndReformatURLParameters from '@utils/extractAndReformatURLParameters';

// Before we redirect to an AD we push new history, so that if user decides to go back, they will be redirected to /reverse, which will open a new AD for a user :)
export const initBack = () => {
  const zones = rewardisExitsState.get();
  const zone = zones.back.onclick.currentTab;

  const prefetchedBack = prefetchUrlsState.get().back;
  if (prefetchedBack?.collectImpression) {
    prefetchedBack.collectImpression();
  }

  const searchParams = extractAndReformatURLParameters({ intendedFor: 'frontend', zone });
  const searchParamsString = searchParams.toString();

  for (let i = 0; i < 3; i += 1) {
    try {
      if (prefetchedBack?.url) {
        window.history.pushState(null, 'Please wait...', `/back-prefetcher.html?url=${encodeURIComponent(prefetchedBack.url)}`);
      } else {
        window.history.pushState(null, 'Please wait...', `/back?${searchParamsString}`);
      }
    } catch (e) {
      break;
    }
  }
};
