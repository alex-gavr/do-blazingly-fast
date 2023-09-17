import extractAndReformatURLParameters, { SearchParamsOptions } from './extractAndReformatURLParameters';

export enum UrlType {
  ipp = 'ipp',
  onclick = 'onclick',
  vignette = 'vignette',
}

//  we receive zone if onclick and url if ipp or vignette
const makeExitUrlFromUrl = (url: string, urlType: UrlType) => {
  if (typeof window !== 'undefined') {
    const searchParams = extractAndReformatURLParameters({ intendedFor: 'backend' });

    let newExitUrl = new URL(url);
    // pass additional params from backend urls further
    if (urlType === UrlType.ipp || urlType === UrlType.vignette) {
      const zone = newExitUrl.searchParams.get('_z') ?? '';
      const bannerId = newExitUrl.searchParams.get(SearchParamsOptions.bannerId) ?? '';

      searchParams.set('_z', `${zone}`);
      searchParams.set('b', `${bannerId}`);
    }
    if (urlType === UrlType.onclick) {
      const userId = newExitUrl.searchParams.get('userId') ?? '';
      searchParams.set('userId', `${userId}`);
    }

    newExitUrl.search = searchParams.toString();
    return newExitUrl.href;
  } else {
    throw new Error('window is not defined');
  }
};
export default makeExitUrlFromUrl;
