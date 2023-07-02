import production from "./isProduction";
import makeExitUrl, { ExitType } from "./makeExitUrl";
import makeExitUrlFromUrl from "./makeExitUrlFromUrl";


type Ipp = {
  click: string;
};

const getIppLink = async (zone: number) => {
  try {
    const url = makeExitUrl(zone, ExitType.ipp) ?? '';
    
    const data = await fetch(url).then((res) => res.json());
    const res = data.ads[0] as Ipp;
    // const url = res.click.slice(15);
    if (production) {
      const domain = window.location.origin;
      const stringAfterDomain = res.click.substring(domain.length);
      const urlPending = `https://in-page-push.net${stringAfterDomain}`;
      const url = makeExitUrlFromUrl(urlPending);
      return url;
    } else {
      const domain = 'https://localhost/';
      const stringAfterDomain = res.click.substring(domain.length);
      const urlPending = `https://in-page-push.net/${stringAfterDomain}`;
      const url = makeExitUrlFromUrl(urlPending);
      console.log(url);
      return url;
    }
  } catch (error) {
    console.log(error);
  }
};

const getExitLinkWithMediation = async (ippZone: number, onclickZone: number) => {
  const getIpp = await getIppLink(ippZone);

  if (getIpp === undefined) {
    const getOnclick = makeExitUrl(onclickZone, ExitType.onclick);
    return getOnclick;
  } else {
    return getIpp;
  }
};

export default getExitLinkWithMediation;
