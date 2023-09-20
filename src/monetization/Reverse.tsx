import { useEffect } from 'preact/hooks';

import { financeExitsState } from '@context/state';

import { useClientSearchParams } from '@hooks/useClientSearchParams';

import justLog from '@utils/justLog';
import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import { getRandomZoneIfArray } from '@utils/simpleFunctions/getRandomZoneIfArray';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';
import replaceCurrentUrl from '@utils/simpleFunctions/replaceCurrentUrl';

import { initBack } from './Back';

interface IReverseProps {
  zone: number | number[] | undefined;
  disabled?: boolean;
}

const Reverse = ({ zone, disabled }: IReverseProps) => {
  const { reverse } = useClientSearchParams();

  const reverseDisabled = disabled || reverse === '0' || !production || debug || zone === undefined;

  const pathname = window.location.pathname;
  const searchParams = window.location.search;
  const pathnameWithSearchParams = `${pathname}${searchParams}`;

  useEffect(() => {
    if (!reverseDisabled) {
      // due to pathname below static finance survey doesn't have reverse
      history.pushState(null, 'Finance Survey', `${pathnameWithSearchParams}`);

      const handleBackButton = async (event: PopStateEvent) => {
        event.preventDefault();
        // This is zone from context
        const financeExits = financeExitsState.get();
        const zoneFromStore = getRandomZoneIfArray(financeExits.onclick_reverse_zone);

        if (zone !== undefined) {
          const url = makeExitUrl(getRandomZoneIfArray(zone) | zoneFromStore, ExitType.onclick);
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
