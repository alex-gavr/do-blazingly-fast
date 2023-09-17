export enum SearchParamsOptions {
  source = 'utm_source',
  bannerId = 'b',
  zone = 'z',
  campaignId = 'campaignid',
  geo = 'geo',
  requestVar = 'var',
  clickId = 's',
  subId = 's', // ?????
  os = 'os',
  osVersion = 'os_version',
  browser = 'browser',
  ymid = 'ymid',
  oaid = 'oaid',
  var3 = 'var_3',
  var4 = 'var_4',
  var5 = 'var_5',
  var6 = 'var_6',
  rhd = 'rhd',
  abTest = 'abtest',

  locale = 'locale',
  debug = 'debug',
  country = 'country',
  offerId = 'offer_id',
}

type TFrontendSearchParams = {
  intendedFor: 'frontend';
  zone: number;
};
type TBackendSearchParams = {
  intendedFor: 'backend';
  zone?: number;
};

type IExtractAndReformatURLParameters = TFrontendSearchParams | TBackendSearchParams;

const extractAndReformatURLParameters = ({ intendedFor, zone }: IExtractAndReformatURLParameters) => {
  if (typeof window !== 'undefined') {
    const currentUrl = new URL(window.location.href);
    const zoneEntry = currentUrl.searchParams.get(SearchParamsOptions.zone) ?? '';
    const requestVar = currentUrl.searchParams.get(SearchParamsOptions.requestVar) ?? '';
    const bannerId = currentUrl.searchParams.get(SearchParamsOptions.bannerId) ?? '';
    const campaignId = currentUrl.searchParams.get(SearchParamsOptions.campaignId) ?? '';
    const osVersion = currentUrl.searchParams.get(SearchParamsOptions.osVersion) ?? '';
    const clickId = currentUrl.searchParams.get(SearchParamsOptions.subId) ?? '';
    const abTest = currentUrl.searchParams.get(SearchParamsOptions.abTest) ?? '';
    const oaid = currentUrl.searchParams.get(SearchParamsOptions.oaid) ?? '';
    const ymid = currentUrl.searchParams.get(SearchParamsOptions.ymid) ?? '';

    const searchParams = new URLSearchParams();

    if (intendedFor === 'backend') {
      searchParams.set('var', `${zoneEntry}`);
      searchParams.set('ymid', `${requestVar}`);
      searchParams.set('b', `${bannerId}`);
      searchParams.set('campaignid', `${campaignId}`);
      searchParams.set('os_version', `${osVersion}`);
      searchParams.set('click_id', `${clickId}`);
      searchParams.set('ab2r', `${abTest}`);
      searchParams.set('oaid', `${oaid}`);
    }
    if (intendedFor === 'frontend') {
      searchParams.set('z', `${zone}`);
      searchParams.set('var', `${requestVar}`);
      searchParams.set('ymid', `${ymid}`);
      searchParams.set('b', `${bannerId}`);
      searchParams.set('campaignid', `${campaignId}`);
      searchParams.set('s', `${clickId}`);
      searchParams.set('ab2r', `${abTest}`);
      searchParams.set('os_version', `${osVersion}`);
      searchParams.set('oaid', `${oaid}`);
    }

    return searchParams;
  } else {
    throw new Error('window is not defined');
  }
};

export default extractAndReformatURLParameters;
