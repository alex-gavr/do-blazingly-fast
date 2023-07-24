import debug from '@src/utils/isDebug';
import { useEventListener } from '@src/utils/useEventListener';

interface IEventListenersProps {}

const EventListeners = ({}: IEventListenersProps) => {
  const pushState = () => {
    const url = new URL(window.location.href);
    console.log('i ran');
    // const pathname = url.pathname;
    const searchParams = url.searchParams;
    for (let index = 0; index <= 2; index++) {
      window.history.pushState(null, 'Finance Survey', `/${searchParams}`);
    }
  };

  const handleBackButton = async (event: PopStateEvent) => {
    event.preventDefault();
    if (!debug) {
      const { financeExitsState } = await import('@context/state');
      const { default: makeExitUrl, ExitType } = await import('@src/utils/makeExitUrl');
      const { getRandomZone } = await import('@src/utils/getRandomZone');
      const { initBack } = await import('./Back');

      const financeExits = financeExitsState.get();

      const zone = getRandomZone(financeExits.onclick_reverse_zone);
      const url = makeExitUrl(zone, ExitType.onclick);

      initBack(financeExits.onclick_back_zone);
      window.location.replace(url);
    } else {
      console.log('reverse is not available in debug mode');
    }
  };

  // useEventListener('scroll', pushState);
  useEventListener('touchstart', pushState);
  useEventListener('touchend', pushState);
  useEventListener('touchcancel', pushState);
  // useEventListener('click', pushState);
  // useEventListener('popstate', handleBackButton);

  return null;
};

export default EventListeners;
