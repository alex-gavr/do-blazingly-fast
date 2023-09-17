import { defaultCountry, defaultLocale, defaultOffer } from '@config/globalConfig';
import type { TValidLocale, TValidOffer } from '@config/globalConfig';

import { SearchParamsOptions } from '@utils/extractAndReformatURLParameters';

type TSearchParamsKeys = keyof typeof SearchParamsOptions;
export type TSearchParams = Partial<Record<SearchParamsOptions, string>>;

export const useClientSearchParams = () => {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    const offerIdParam = (searchParams.get(SearchParamsOptions.offerId) as TSearchParams['offer_id']) ?? defaultOffer;
    const offerId = offerIdParam !== defaultOffer ? parseInt(offerIdParam) : defaultOffer;

    const language = (searchParams.get(SearchParamsOptions.locale) as TSearchParams['locale']) ?? defaultLocale;
    const country = (searchParams.get(SearchParamsOptions.country) as TSearchParams['country']) ?? defaultCountry;
    const debug = (searchParams.get(SearchParamsOptions.debug) as TSearchParams['debug']) ? true : false;

    const zone = (searchParams.get(SearchParamsOptions.zone) as TSearchParams['z']) ?? '';
    const requestVar = (searchParams.get(SearchParamsOptions.requestVar) as TSearchParams['var']) ?? '';
    const ymid = (searchParams.get(SearchParamsOptions.ymid) as TSearchParams['ymid']) ?? '';
    const var3 = (searchParams.get(SearchParamsOptions.var3) as TSearchParams['var_3']) ?? '';
    const abTest = (searchParams.get(SearchParamsOptions.abTest) as TSearchParams['abtest']) ?? '';
    const osVersion = (searchParams.get(SearchParamsOptions.osVersion) as TSearchParams['os_version']) ?? '';
    const bannerId = (searchParams.get(SearchParamsOptions.bannerId) as TSearchParams['b']) ?? '';
    const campaignId = (searchParams.get(SearchParamsOptions.campaignId) as TSearchParams['campaignid']) ?? '';
    const subId = (searchParams.get(SearchParamsOptions.subId) as TSearchParams['s']) ?? '';

    return {
      language: language as TValidLocale,
      country,
      offerId: offerId as TValidOffer,
      debug,
      zone,
      requestVar,
      ymid,
      var3,
      abTest,
      osVersion,
      bannerId,
      campaignId,
      subId,
    };
  } else {
    throw new Error('You cannot use useClientSearchParams function on backend');
  }
};
