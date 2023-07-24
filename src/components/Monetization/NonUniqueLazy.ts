import production from '@src/utils/isProduction';
import { getCookie } from 'typescript-cookie';

// TODO: Do I need to disable this?
const NonUnique = async () => {
  const nonUnique = getCookie('nonUnique') ?? false;
  const nonUniqueAutoExit = getCookie('autoExit') ?? false;
  const nonUniqueTeen = getCookie('nonUniqueTeen') ?? false;

  const initNonUniqueTeen = async () => {
    const exitZones = await import('@config/2025');
    const { getExitLinkFromBackend } = await import('@utils/getExitLinkFromBackend');
    const { initBack } = await import('./Back');

    const nonUniqueTeenIpp = exitZones.default.ipp_not_unique_teen;
    const url = await getExitLinkFromBackend(nonUniqueTeenIpp);
    initBack(exitZones.default.onclick_back_zone);
    window.open(url, '_blank');
    window.location.replace(url);
  };

  const initNonUnique = async () => {
    const exitZones = await import('@config/2025');
    const { getExitLinkFromBackend } = await import('@utils/getExitLinkFromBackend');
    const { initBack } = await import('./Back');
    const { getRandomZone } = await import('@utils/getRandomZone');

    const nonUniqueIpp = getRandomZone(exitZones.default.ipp_not_unique);
    const url = await getExitLinkFromBackend(nonUniqueIpp);
    initBack(exitZones.default.onclick_back_zone);
    window.open(url, '_blank');
    window.location.replace(url);
  };

  if (nonUnique || nonUniqueAutoExit || nonUniqueTeen) {
    if (nonUniqueTeen) {
      await initNonUniqueTeen();
    } else {
      await initNonUnique();
    }
  }

  return null;
};

if (typeof window !== 'undefined') {
  const url = new URL(window.location.href);
  const abtest = parseInt(url.searchParams.get('abtest') ?? '0');

  if (production && abtest !== 240769111) {
    await NonUnique();
  }
}
