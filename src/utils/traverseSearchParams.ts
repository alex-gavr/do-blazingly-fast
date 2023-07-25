import { SearchParamsOptions } from './makeExitUrl';

const traverseSearchParams = () => {
  if (typeof window !== 'undefined') {
    const currentUrl = new URL(window.location.href);
    const zoneEntry = currentUrl.searchParams.get(SearchParamsOptions.zone) ?? '';
    const requestVar = currentUrl.searchParams.get(SearchParamsOptions.requestVar) ?? '';
    const bannerId = currentUrl.searchParams.get(SearchParamsOptions.bannerId) ?? '';
    const campaignId = currentUrl.searchParams.get(SearchParamsOptions.campaignId) ?? '';
    const osVersion = currentUrl.searchParams.get(SearchParamsOptions.osVersion) ?? '';
    const clickId = currentUrl.searchParams.get(SearchParamsOptions.subId) ?? '';
    const abTest = currentUrl.searchParams.get(SearchParamsOptions.abTest) ?? '';

    const searchParams = new URLSearchParams();

    // Adding search parameters
    searchParams.set('var', `${zoneEntry}`);
    searchParams.set('ymid', `${requestVar}`);
    searchParams.set('b', `${bannerId}`);
    searchParams.set('campaignid', `${campaignId}`);
    searchParams.set('osversion', `${osVersion}`);
    searchParams.set('click_id', `${clickId}`);
    searchParams.set('ab2r', `${abTest}`);

    return searchParams;
  } else {
    throw new Error('window is not defined');
  }
};

export default traverseSearchParams;
