import { useEffect, useState } from 'preact/hooks';

import { rewardisExitsState } from '@context/state';

import { useClientSearchParams } from '@hooks/useClientSearchParams';

import justLog from '@utils/justLog';
import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';

import pushMicroTagScript from './pushMicroTagScript';

type InitPushProps = {};

const InitPush = ({}: InitPushProps) => {
  const [done, setDone] = useState<boolean>(false);

  const startPush = () => {
    // This is zone from context
    // const financeExits = financeExitsState.get();
    // const pushZone = getRandomZoneIfArray(financeExits.push_zone);
    const pushZone = rewardisExitsState.get().push.zone;

    pushMicroTagScript({ pushZone: pushZone });
    setDone(true);
  };

  useEffect(() => {
    const { push } = useClientSearchParams();
    if (!done && push !== '0') {
      if (production && !debug) {
        startPush();
      } else {
        justLog({ somethingToLog: 'push is disabled in debug mode', type: 'info' });
      }
    }
  }, [done]);
  return null;
};

export default InitPush;
