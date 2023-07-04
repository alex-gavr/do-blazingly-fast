import { SearchParamsOptions } from '@utils/makeExitUrl';

// Before we redirect to an AD we push new history, so that if user decides to go back, they will be redirected to /reverse, which will open a new AD for a user :)
export const initBack = (backZone: number) => {
  const currentUrl = new URL(window.location.href);
  const requestVar = currentUrl.searchParams.get(SearchParamsOptions.requestVar) ?? '';
  const osVersion = currentUrl.searchParams.get(SearchParamsOptions.osVersion) ?? '';
  const clickId = currentUrl.searchParams.get(SearchParamsOptions.subId) ?? '';
  const abTest = currentUrl.searchParams.get(SearchParamsOptions.abTest) ?? '';
  const ymid = currentUrl.searchParams.get(SearchParamsOptions.ymid) ?? '';
  const oaid = currentUrl.searchParams.get(SearchParamsOptions.oaid) ?? '';

  const queryParams = new URLSearchParams();

  // Adding search parameters

  queryParams.set('z', `${backZone}`);
  queryParams.set('s', `${clickId}`);
  queryParams.set('var', `${requestVar}`);
  queryParams.set('ymid', `${ymid}`);
  queryParams.set('ab2r', `${abTest}`);
  queryParams.set('os_version', `${osVersion}`);
  queryParams.set('oaid', `${oaid}`);
  //   queryParams.set('domain_onclick', `${domain_onclick}`);

  const queryParamString = queryParams.toString();

  for (let i = 0; i < 5; i += 1) {
    window.history.pushState(null, 'Please wait...', `/back?${queryParamString}`);
  }
};
