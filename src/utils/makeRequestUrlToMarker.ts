import { ExitType, SearchParamsOptions } from './makeExitUrl';

export default function makeRequestUrlToMarker(searchParams: URL['searchParams'], type: ExitType, zone: number) {
  const zoneEntry = searchParams.get(SearchParamsOptions.zone) ?? '';
  const requestVar = searchParams.get(SearchParamsOptions.requestVar) ?? '';
  const bannerId = searchParams.get(SearchParamsOptions.bannerId) ?? '';
  const campaignId = searchParams.get(SearchParamsOptions.campaignId) ?? '';
  const osVersion = searchParams.get(SearchParamsOptions.osVersion) ?? '';
  const clickId = searchParams.get(SearchParamsOptions.subId) ?? '';
  const abTest = searchParams.get(SearchParamsOptions.abTest) ?? '';

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
  if (type === ExitType.ipp) {
    queryParams.set('zz', `${zone}`);
    baseUrl = `${import.meta.env.PUBLIC_IPP_URL}`;
  }
  if (type === ExitType.vignette) {
    baseUrl = `${import.meta.env.PUBLIC_DATA_URL}/${zone}`;
  }

  const url = new URL(baseUrl);
  url.search = queryParams.toString();
  return url.href;
}
