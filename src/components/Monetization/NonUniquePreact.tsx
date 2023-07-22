import exitZones from '@config/2025';
import { useEffect } from 'preact/hooks';
import { initBack } from './Back';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import { getRandomZone } from '@utils/getRandomZone';
import { getCookie } from 'typescript-cookie';

interface INonUniqueProps {}

const NonUnique = ({}: INonUniqueProps) => {
  const nonUnique = getCookie('nonUnique') ?? false;
  const nonUniqueAutoExit = getCookie('autoExit') ?? false;
  const nonUniqueTeen = getCookie('nonUniqueTeen') ?? false;

  useEffect(() => {
    if (!nonUnique && !nonUniqueAutoExit && !nonUniqueTeen) {
      return;
    } else {
      if (nonUniqueTeen) {
        const initNonUniqueTeen = async () => {
          const nonUniqueTeenIpp = exitZones.ipp_not_unique_teen;
          const url = await getExitLinkFromBackend(nonUniqueTeenIpp);
          initBack(exitZones.onclick_back_zone);
          window.open(url, '_blank');
          window.location.replace(url);
        };
        initNonUniqueTeen();
      } else {
        const initNonUnique = async () => {
          const nonUniqueIpp = getRandomZone(exitZones.ipp_not_unique);
          const url = await getExitLinkFromBackend(nonUniqueIpp);
          initBack(exitZones.onclick_back_zone);
          window.open(url, '_blank');
          window.location.replace(url);
        };
        initNonUnique();
      }
    }
  }, []);

  return null;
};

export default NonUnique;