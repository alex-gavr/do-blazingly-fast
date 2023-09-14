import production from '@src/utils/isProduction';
import { useEffect } from 'preact/hooks';
import { getCookie } from 'typescript-cookie';

const NonUnique = () => {
  const url = new URL(window.location.href);

  const abtest = url.searchParams.get('abtest');
  const nonUnique = getCookie('nonUnique') ?? false;
  const nonUniqueTeen = getCookie('nonUniqueTeen') ?? false;
  const nonUniqueDo = getCookie('lead') ?? false;
  const nonUniqueTeenDo = getCookie('lead-teenage') ?? false;
  const nonUniqueCrossDo = getCookie('lead-cross') ?? false;
  const nonUniqueCrossTeenDo = getCookie('lead-teenage-cross') ?? false;

  const initNonUniqueTeen = async () => {
    const exitZones = await import('@config/2025');
    const { getExitLinkFromBackend } = await import('@utils/getExitLinkFromBackend');

    const nonUniqueTeenIpp = exitZones.default.ipp_not_unique_teen;
    const url = await getExitLinkFromBackend(nonUniqueTeenIpp);
    window.open(url, '_blank');
    window.location.replace(url);
  };

  const initNonUnique = async () => {
    const exitZones = await import('@config/2025');
    const { getExitLinkFromBackend } = await import('@utils/getExitLinkFromBackend');
    const { getRandomZone } = await import('@utils/getRandomZone');

    const nonUniqueIpp = getRandomZone(exitZones.default.ipp_not_unique);
    const url = await getExitLinkFromBackend(nonUniqueIpp);
    window.open(url, '_blank');
    window.location.replace(url);
  };

  useEffect(() => {
    if (abtest !== '270769111' && abtest !== '270769222') {
      if (nonUnique || nonUniqueTeen || nonUniqueDo || nonUniqueTeenDo || nonUniqueCrossDo || nonUniqueCrossTeenDo) {
        if (nonUniqueTeen || nonUniqueTeenDo || nonUniqueCrossTeenDo) {
          initNonUniqueTeen();
        } else {
          initNonUnique();
        }
      }
    }
  }, []);

  return null;
};

export default NonUnique;
