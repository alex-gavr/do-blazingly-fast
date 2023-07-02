import exitZones from '@config/2025';
import makeExitUrl, { ExitType } from '@utils/makeExitUrl';

const reverse = () => {
  const zone = exitZones.onclick_reverse_zone[Math.floor(Math.random() * exitZones.onclick_reverse_zone.length)];

  const url = makeExitUrl(zone, ExitType.reverse);
  // Optimize history manipulation
  const blockHistory = () => {
    const onPopstate = () => {
      history.replaceState(null, document.title, location.pathname + location.search);
      window.onbeforeunload = null;

      if (url) {
        location.replace(url);
      }
    };

    addEventListener('popstate', onPopstate);
  };

  // Simplify exitpop handling
  const removeExitpop = () => {
    window.onbeforeunload = null;
  };

  const setExitpop = (doRedirect: boolean) => {
    window.onbeforeunload = () => {
      if (doRedirect) {
        setTimeout(() => {
          removeExitpop();

          if (url) {
            location.replace(url);
          }
        }, 100);
      }
    };
  };

  blockHistory();

  try {
    performance.getEntriesByType('navigation').forEach((item) => {
      if (item.entryType !== 'reload') {
        setExitpop(item.entryType === 'navigate');
      }
    });
  } catch (e) {
    setExitpop(true);
  }

  // Optimize event listener for click events
  document.addEventListener(
    'click',
    function (e) {
      let target = e.target as Element; // Use type assertion to specify Element type

      while (target && target !== document.documentElement) {
        if (target.matches('button') || target.matches('.survey__button')) {
          removeExitpop();
          return;
        }

        target = target.parentNode as Element; // Use type assertion for parentNode as well
      }
    },
    false,
  );
};

export default reverse;
