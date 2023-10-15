import { prefetchUrlsState, rewardisExitsState } from '@context/state';

import { useClientSearchParams } from '@hooks/useClientSearchParams';

import addScript from '@utils/initFunctions/addScript';

export type TPrefetcherZoneType = 'back_zone' | 'reverse_zone';

export interface IPrefetcherData {
  url: string;
  collectImpression: () => void;
}

interface PrefetcherFunctionProps {
  zone: number;
  ab2r?: string;
  domain?: string;
  domain_onclick: string;
  bop?: string; // base options path /19/
  brp?: string; // base redirect path /4/
  oaid?: string;
  os_version?: string;
  rhd?: string;
  s?: string;
  var?: string;
  var3?: string;
  var_3?: string;
  var4?: string;
  var_4?: string;
  ymid?: string;
}
declare global {
  interface Window {
    Prefetcher: (props: PrefetcherFunctionProps, cb: (url: string, collectImpression: () => void) => void) => void;
    PrefetcherData: {
      back_zone?: IPrefetcherData;
      reverse_zone?: IPrefetcherData;
    };
  }
}

addScript('scripts/prefetcher.js');

let isPrefetching: boolean = false;

function prefetcher(zoneId: number, type: TPrefetcherZoneType, cb: (data: IPrefetcherData) => void): void {
  let domainPrefetcher: string = import.meta.env.PUBLIC_PREFETCHER_DOMAIN;

  const { zone, subId, var3, requestVar, abTest } = useClientSearchParams();

  //   if (isProduction) {
  //     domainPrefetcher = window.location.host;
  //   }

  window.Prefetcher(
    {
      zone: zoneId,
      bop: '/5/',
      domain: domainPrefetcher,
      rhd: '1',
      var: zone,
      var_3: type === 'reverse_zone' ? subId : var3,
      ymid: requestVar,
      s: subId,
      ab2r: abTest,
      domain_onclick: import.meta.env.PUBLIC_DOMAIN_REVERSE,
    },
    (url: string, collectImpression: () => void) => {
      cb({
        url,
        collectImpression,
      });
    },
  );
}

function startPrefetcherByZoneType(type: TPrefetcherZoneType, cb?: () => void): void {
  const rewardisExits = rewardisExitsState.get();
  const back = rewardisExits.back.onclick.currentTab;
  const reverse = rewardisExits.reverse.onclick.currentTab;

  const zone = type === 'back_zone' ? back : reverse; // 4292580

  if (zone) {
    prefetcher(zone, type, (data: IPrefetcherData) => {
      if (type === 'back_zone') {
        prefetchUrlsState.set({
          back: data,
          reverse: prefetchUrlsState.get().reverse,
        });
      } else {
        prefetchUrlsState.set({
          back: prefetchUrlsState.get().back,
          reverse: data,
        });
      }

      if (cb) {
        cb();
      }
    });
  } else if (cb) {
    cb();
  }
}

function initPrefetcher(): void {
  if (!isPrefetching && typeof window.Prefetcher === 'function') {
    isPrefetching = true;
    let type: TPrefetcherZoneType = 'back_zone';
    startPrefetcherByZoneType(type, () => {
      type = 'reverse_zone';
      startPrefetcherByZoneType(type);
    });
  } else {
    setTimeout(() => {
      initPrefetcher();
    }, 1000);
  }
}

export { initPrefetcher };
