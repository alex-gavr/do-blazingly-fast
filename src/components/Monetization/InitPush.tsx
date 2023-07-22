import { useEffect, useState } from 'preact/hooks';
import pushMicroTagScript from './pushMicroTagScript';
import exitZones from '@config/2025';
import { getRandomZone } from '@utils/getRandomZone';
import debug from '@src/utils/isDebug';

interface IInitPushProps {}

const InitPush = ({}: IInitPushProps) => {
  const [done, setDone] = useState<boolean>(false);

  const pushZone = getRandomZone(exitZones.push_zone);

  useEffect(() => {
    if (pushZone && !done) {
      if (!debug) {
        pushMicroTagScript({ pushZone: pushZone });
        setDone(true);
      } else {
        console.log('push disabled in debug mode');
      }
    }
  }, [done]);
  return null;
};

export default InitPush;
