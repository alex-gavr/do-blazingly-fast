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
    const currentUrl = new URL(window.location.href);
    const zoneEntry = currentUrl.searchParams.get(SearchParamsOptions.zone) ?? '';
    const requestVar = currentUrl.searchParams.get(SearchParamsOptions.requestVar) ?? '';
    const bannerId = currentUrl.searchParams.get(SearchParamsOptions.bannerId) ?? '';
    const campaignId = currentUrl.searchParams.get(SearchParamsOptions.campaignId) ?? '';
    const osVersion = currentUrl.searchParams.get(SearchParamsOptions.osVersion) ?? '';
    const clickId = currentUrl.searchParams.get(SearchParamsOptions.subId) ?? '';
    const abTest = currentUrl.searchParams.get(SearchParamsOptions.abTest) ?? '';

    const queryParams = new URLSearchParams();

    // Adding search parameters
    queryParams.set('var', `${zoneEntry}`);
    queryParams.set('ymid', `${requestVar}`);
    queryParams.set('b', `${bannerId}`);
    queryParams.set('campaignid', `${campaignId}`);
    queryParams.set('osversion', `${osVersion}`);
    queryParams.set('click_id', `${clickId}`);
    queryParams.set('ab2r', `${abTest}`);

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