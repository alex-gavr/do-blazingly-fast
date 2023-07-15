import exitZones from '@config/2025';
import makeExitUrl, { ExitType } from '@utils/makeExitUrl';
import { useEffect } from 'preact/hooks';
import { initBack } from './Back';
import { getRandomZone } from '@utils/getRandomZone';

interface IReverseProps {}

const Reverse = ({}: IReverseProps) => {
  // Push a state to the browser history with the desired URL

  const pathname = window.location.pathname;
  const searchParams = window.location.search;

  useEffect(() => {
    if (pathname === '/') {
      history.pushState(null, 'Finance Survey', `/${searchParams}`);
    } else if (pathname === '/assessment') {
      history.pushState(null, 'Finance Survey', `/assessment${searchParams}`);
    } else if (pathname === '/offer') {
      history.pushState(null, 'Finance Survey', `/offer${searchParams}`);
    }

    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();

      const zone = getRandomZone(exitZones.onclick_reverse_zone);
      const url = makeExitUrl(zone, ExitType.onclick);

      initBack(exitZones.onclick_back_zone);
      window.location.replace(url);
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return null;
};

export default Reverse;
