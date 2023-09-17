import { useEffect } from 'preact/hooks';
import { getCookie } from 'typescript-cookie';

const NonUnique = () => {
  const nonUnique = getCookie('nonUnique') ?? false;
  const nonUniqueTeen = getCookie('nonUniqueTeen') ?? false;
  const nonUniqueDo = getCookie('lead') ?? false;
  const nonUniqueTeenDo = getCookie('lead-teenage') ?? false;
  const nonUniqueCrossDo = getCookie('lead-cross') ?? false;
  const nonUniqueCrossTeenDo = getCookie('lead-teenage-cross') ?? false;

  const initNonUniqueTeen = async () => {
    const exitZones = await import('@config/2025');
    const { getExitLinkFromBackendWithRotationInMarker } = await import('@utils/linksHelpers/getExitLinkFromBackendWithRotationInMarker');
    const { default: openUrlInNewTab } = await import('@utils/simpleFunctions/openUrlInNewTab');
    const { default: replaceCurrentUrl } = await import('@utils/simpleFunctions/replaceCurrentUrl');

    const nonUniqueTeenIpp = exitZones.default.ipp_not_unique_teen;
    const url = await getExitLinkFromBackendWithRotationInMarker(nonUniqueTeenIpp);

    if (!(url instanceof Error)) {
      openUrlInNewTab(url);
      replaceCurrentUrl(url);
    }
  };

  const initNonUnique = async () => {
    const exitZones = await import('@config/2025');
    const { getExitLinkFromBackendWithRotationInMarker } = await import('@utils/linksHelpers/getExitLinkFromBackendWithRotationInMarker');
    const { getRandomZone } = await import('@utils/simpleFunctions/getRandomZone');
    const { default: openUrlInNewTab } = await import('@utils/simpleFunctions/openUrlInNewTab');
    const { default: replaceCurrentUrl } = await import('@utils/simpleFunctions/replaceCurrentUrl');

    const nonUniqueIpp = getRandomZone(exitZones.default.ipp_not_unique);
    const url = await getExitLinkFromBackendWithRotationInMarker(nonUniqueIpp);

    if (!(url instanceof Error)) {
      openUrlInNewTab(url);
      replaceCurrentUrl(url);
    }
  };

  useEffect(() => {
    if (nonUnique || nonUniqueTeen || nonUniqueDo || nonUniqueTeenDo || nonUniqueCrossDo || nonUniqueCrossTeenDo) {
      if (nonUniqueTeen || nonUniqueTeenDo || nonUniqueCrossTeenDo) {
        initNonUniqueTeen();
      } else {
        initNonUnique();
      }
    }
  }, []);

  return null;
};

export default NonUnique;
