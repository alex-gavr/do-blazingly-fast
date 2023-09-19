import { useEffect, useState } from 'preact/hooks';

import { financeExitsState } from '@context/state';

import { useClientSearchParams } from '@hooks/useClientSearchParams';

import justLog from '@utils/justLog';
import { getRandomZoneIfArray } from '@utils/simpleFunctions/getRandomZoneIfArray';
import debug from '@utils/simpleFunctions/isDebug';

import pushMicroTagScript from './pushMicroTagScript';

type InitPushProps = {
  zone: number;
};

const InitPush = ({ zone }: InitPushProps) => {
  const [done, setDone] = useState<boolean>(false);
  const { push } = useClientSearchParams();

  const startPush = async () => {
    const financeExits = financeExitsState.get();

    const pushZone = getRandomZoneIfArray(financeExits.push_zone);
    pushMicroTagScript({ pushZone: pushZone | zone });
    setDone(true);
  };

  useEffect(() => {
    if (!done && push !== '0') {
      if (!debug) {
        startPush();
      } else {
        justLog({ somethingToLog: 'push is disabled in debug mode', type: 'info' });
      }
    }
  }, [done]);
  return null;
};

export default InitPush;
