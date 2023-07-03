import makeExitUrl, { ExitType } from './makeExitUrl';
import makeExitUrlFromUrl, { UrlType } from './makeExitUrlFromUrl';

type IppData = {
  banner_id: number;
  title: string;
  text: string;
  icon: string;
  image: string;
  click: string;
  impression_url: string;
  buttons?: {
    name: string;
    url: string;
  }[];
};

const getIppLink = async (zone: number) => {
  try {
    const url = makeExitUrl(zone, ExitType.ipp) ?? '';

    // zone example 6020461
    const data = await fetch(url).then((res) => res.json());
    const res = data.ads[0] as IppData;
    const exitUrl = makeExitUrlFromUrl(res.click, UrlType.ipp);

    return exitUrl;
  } catch (error) {
    console.log(error);
  }
};

export const getIppIfErrorGetOnclick = async (ippZone: number, onclickZone: number) => {
  const getIpp = await getIppLink(ippZone);

  if (getIpp === undefined) {
    const getOnclick = makeExitUrl(onclickZone, ExitType.onclick);
    return getOnclick;
  } else {
    return getIpp;
  }
};



// OLD WAY TO GET IPP
// I was requesting /rotate with a zone that was not in the list of rotating zones

// try {
//   const url = makeExitUrl(zone, ExitType.ipp) ?? '';

//   // zone example 6020461
//   const data = await fetch(url).then((res) => res.json());
//   const res = data.ads[0] as IppData;

//   // response is:

//   // const url = res.click.slice(15);
//   if (production) {
//     const domain = window.location.origin;
//     const stringAfterDomain = res.click.substring(domain.length);
//     const urlPending = `https://in-page-push.net${stringAfterDomain}`;
//     const url = makeExitUrlFromUrl(urlPending, UrlType.ipp);
//     return url;
//   } else {
//     const domain = 'https://localhost/';
//     const stringAfterDomain = res.click.substring(domain.length);
//     const urlPending = `https://in-page-push.net/${stringAfterDomain}`;
//     const url = makeExitUrlFromUrl(urlPending, UrlType.ipp);
//     return url;
//   }
// } catch (error) {
//   console.log(error);
// }