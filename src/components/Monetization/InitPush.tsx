import { useEffect, useState } from 'preact/hooks';

import debug from '@utils/simpleFunctions/isDebug';

interface IInitPushProps {}

const InitPush = ({}: IInitPushProps) => {
  const [done, setDone] = useState<boolean>(false);

  const startPush = async () => {
    const { getRandomZone } = await import('@utils/simpleFunctions/getRandomZone');
    const { financeExitsState } = await import('@context/state');
    const { default: pushMicroTagScript } = await import('./pushMicroTagScript');

    const financeExits = financeExitsState.get();

    const pushZone = getRandomZone(financeExits.push_zone);
    pushMicroTagScript({ pushZone: pushZone });
    setDone(true);
  };

  useEffect(() => {
    if (!done) {
      if (!debug) {
        startPush();
      } else {
        console.log('push is disabled in debug mode');
      }
    }
  }, [done]);
  return null;
};

export default InitPush;
