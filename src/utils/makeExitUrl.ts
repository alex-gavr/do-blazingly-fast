import extractAndReformatURLParameters from './extractAndReformatURLParameters';

export enum ExitType {
  onclick = 'onclick',
  ipp = 'ipp',
  ippWithRotationOnBackend = 'ippWithRotationOnBackend',
  vignette = 'vignette',
  reverse = 'reverse',
}

//  we make EXIT url for onclick, but ipp and vignette urls used to fetch data from server
const makeExitUrl = (zone: number | string, type: ExitType) => {
  if (typeof window !== 'undefined') {
    const queryParams = extractAndReformatURLParameters({ intendedFor: 'backend' });

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
    throw new Error('window is not defined');
  }
};
export default makeExitUrl;
