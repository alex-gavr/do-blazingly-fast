import type { IPrefetcherData, TPrefetcherZoneType } from '@features/Prefetcher';

function getPrefetcherData(type: TPrefetcherZoneType): IPrefetcherData | null | undefined {
  if (window.PrefetcherData && window.PrefetcherData[type]) {
    return window.PrefetcherData[type];
  }

  return null;
}

export default getPrefetcherData;
