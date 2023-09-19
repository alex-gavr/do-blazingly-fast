import { useEffect } from 'preact/hooks';

import { financeExitsState } from '@context/state';

import { useClientSearchParams } from '@hooks/useClientSearchParams';

import justLog from '@utils/justLog';
import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import { getRandomZoneIfArray } from '@utils/simpleFunctions/getRandomZoneIfArray';
import debug from '@utils/simpleFunctions/isDebug';
import replaceCurrentUrl from '@utils/simpleFunctions/replaceCurrentUrl';

import { initBack } from './Back';

interface IReverseProps {
  zone: number;
  disabled?: boolean;
}

const Reverse = ({ zone, disabled }: IReverseProps) => {
  const { reverse } = useClientSearchParams();

  const pathname = window.location.pathname;
  const searchParams = window.location.search;
  const pathnameWithSearchParams = `${pathname}${searchParams}`;

  useEffect(() => {
    if (!disabled || reverse !== '0') {
      // due to pathname below static finance survey doesn't have reverse
      history.pushState(null, 'Finance Survey', `${pathnameWithSearchParams}`);

      const handleBackButton = async (event: PopStateEvent) => {
        event.preventDefault();
        if (!debug) {
          const financeExits = financeExitsState.get();

          // TODO: Decide how we do? Do we prop drill or get zone/zones from context?
          const zoneFromStore = getRandomZoneIfArray(financeExits.onclick_reverse_zone);
          const url = makeExitUrl(zone | zoneFromStore, ExitType.onclick);

          initBack();
          replaceCurrentUrl(url);
        } else {
          justLog({ somethingToLog: 'reverse is not available in debug mode', type: 'info' });
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
