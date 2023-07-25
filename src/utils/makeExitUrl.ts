import traverseSearchParams from './traverseSearchParams';

export enum ExitType {
  onclick = 'onclick',
  ipp = 'ipp',
  ippWithRotationOnBackend = 'ippWithRotationOnBackend',
  vignette = 'vignette',
  reverse = 'reverse',
}

export enum SearchParamsOptions {
  locale = 'locale',
  debug = 'debug',
  country = 'country',
  offerId = 'offer_id',
  zone = 'z',
  requestVar = 'var',
  ymid = 'ymid',
  var3 = 'var_3',
  abTest = 'abtest',
  osVersion = 'os_version',
  bannerId = 'b',
  campaignId = 'campaignid',
  subId = 's',
  oaid = 'oaid',
}

//  we make EXIT url for onclick, but ipp and vignette urls used to fetch data from server
const makeExitUrl = (zone: number | string, type: ExitType) => {
  if (typeof window !== 'undefined') {
    const queryParams = traverseSearchParams();

    let baseUrl: string = '';
    if (type === ExitType.onclick) {
      baseUrl = `${import.meta.env.PUBLIC_ONCLICK_DOMAIN}/${import.meta.env.PUBLIC_ONCLICK_CODE}/${zone}/`;
    }
    if (type === ExitType.ipp) {
      baseUrl = `${import.meta.env.PUBLIC_FORMATS_DOMAIN_DATA}/${zone}`;
    }
    if (type === ExitType.ippWithRotationOnBackend) {
      queryParams.set('zz', `${zone}`);
      baseUrl = `${import.meta.env.PUBLIC_MARKER_DOMAIN_ROTATION}`;
    }
    if (type === ExitType.vignette) {
      baseUrl = `${import.meta.env.PUBLIC_FORMATS_DOMAIN_DATA}/${zone}`;
    }
    if (type === ExitType.reverse) {
      baseUrl = `${import.meta.env.PUBLIC_DOMAIN_REVERSE}/${import.meta.env.PUBLIC_ONCLICK_CODE}/${zone}/`;
    }

    const url = new URL(baseUrl);
    url.search = queryParams.toString();
    return url.href;
  } else {
    throw new Error('You cannot get exit url on backend');
  }
};
export default makeExitUrl;
