import { useEffect } from 'preact/hooks';

import justLog from '@utils/justLog';
import debug from '@utils/simpleFunctions/isDebug';

interface IReverseProps {}

const Reverse = ({}: IReverseProps) => {
  // Push a state to the browser history with the desired URL

  const pathname = window.location.pathname;
  const searchParams = window.location.search;

  useEffect(() => {
    // due to pathname below static finance survey doesn't have reverse
    if (pathname === '/') {
      history.pushState(null, 'Finance Survey', `/${searchParams}`);
    } else if (pathname === '/assessment') {
      history.pushState(null, 'Finance Survey', `/assessment${searchParams}`);
    } else if (pathname === '/offer') {
      history.pushState(null, 'Finance Survey', `/offer${searchParams}`);
    }

    const handleBackButton = async (event: PopStateEvent) => {
      event.preventDefault();
      if (!debug) {
        const { financeExitsState } = await import('@context/state');
        const { default: makeExitUrl, ExitType } = await import('@utils/linksHelpers/makeExitUrl');
        const { getRandomZone } = await import('@utils/simpleFunctions/getRandomZone');
        const { initBack } = await import('./Back');
        const { default: replaceCurrentUrl } = await import('@utils/simpleFunctions/replaceCurrentUrl');

        const financeExits = financeExitsState.get();

        const zone = getRandomZone(financeExits.onclick_reverse_zone);
        const url = makeExitUrl(zone, ExitType.onclick);

        initBack(financeExits.onclick_back_zone);
        replaceCurrentUrl(url);
      } else {
        justLog({ somethingToLog: 'reverse is not available in debug mode', type: 'info' });
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return null;
};

export default Reverse;
