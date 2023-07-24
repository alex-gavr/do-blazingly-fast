import { useEffect, useState } from 'preact/hooks';
import production from '@utils/isProduction';
import debug from '@src/utils/isDebug';

// const THIRTY_SECONDS = 30;
// const FORTY_SECONDS = 40;

const AutoExitForNonUniqueTest = () => {
  const [count, setCount] = useState(15);

  const defaultAutoExit = async () => {
    if (production && !debug) {
      const { default: makeExitUrl, ExitType } = await import('@src/utils/makeExitUrl');

      const main = makeExitUrl(6156873, ExitType.onclick);
      const pops = makeExitUrl(6156873, ExitType.onclick);

      window.open(main, '_blank');
      window.location.replace(pops);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);
    if (count === 0) {
      defaultAutoExit();
    }

    return () => clearInterval(interval);
  }, [count]);

  return null;
};

export default AutoExitForNonUniqueTest;
