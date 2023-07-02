import exitZones from '@config/2025';
import makeExitUrl, { ExitType } from '@utils/makeExitUrl';
import { useEffect } from 'preact/hooks';

interface IReverseProps {}

const Reverse = ({}: IReverseProps) => {
  // Push a state to the browser history with the desired URL

  const pathname = window.location.pathname;
  const searchParams = window.location.search;

  useEffect(() => {
    if (pathname === '/') {
      const newHistoryStates = [{ state: { page: 'Finance Survey1' }, title: 'Finance Survey', url: `/${searchParams}` }];
      newHistoryStates.forEach((state) => {
        history.pushState(state.state, state.title, state.url);
      });
    } else if (pathname === '/assessment') {
      const newHistoryStates = [{ state: { page: 'Finance Survey2' }, title: 'Finance Survey', url: `/assessment${searchParams}` }];
      newHistoryStates.forEach((state) => {
        history.pushState(state.state, state.title, state.url);
      });
    } else if (pathname === '/offer') {
      const newHistoryStates = [{ state: { page: 'Finance Survey3' }, title: 'Finance Survey', url: `/offer${searchParams}` }];
      newHistoryStates.forEach((state) => {
        history.pushState(state.state, state.title, state.url);
      });
    }

    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();

      const zone = exitZones.onclick_reverse_zone[Math.floor(Math.random() * exitZones.onclick_reverse_zone.length)];
      const url = makeExitUrl(zone, ExitType.onclick);
      
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
