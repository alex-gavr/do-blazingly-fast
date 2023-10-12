import makeExitUrlFromUrl, { UrlType } from './linksHelpers/makeExitUrlFromUrl';

const generateUrlBasedOnType = (url: string, type: 'ipp' | 'onclick'): string => {
  const domain = type === 'ipp' ? import.meta.env.PUBLIC_IPP_DOMAIN : import.meta.env.PUBLIC_ONCLICK_DOMAIN;
  const code = type === 'ipp' ? '' : `/${import.meta.env.PUBLIC_ONCLICK_CODE}`;
  const urlFromBackend = new URL(url);
  const replacedUrl = url.replace(urlFromBackend.origin, `${domain}${code}`);

  const urlType = type === 'ipp' ? UrlType.ipp : UrlType.onclick;
  return makeExitUrlFromUrl(new URL(replacedUrl).href, urlType);
};

export default generateUrlBasedOnType;
