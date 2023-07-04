import exitZones from '@config/2025';
import { useEffect } from 'preact/hooks';
import { getCookie } from 'typescript-cookie';
import { initBack } from './Back';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';

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
          const nonUniqueIpp = exitZones.ipp_not_unique[Math.floor(Math.random() * exitZones.ipp_not_unique.length)];
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
