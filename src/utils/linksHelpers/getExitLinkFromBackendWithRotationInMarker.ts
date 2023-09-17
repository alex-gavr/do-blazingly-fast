import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import makeExitUrlFromUrl, { UrlType } from '@utils/linksHelpers/makeExitUrlFromUrl';

export type Ipp = {
  click: string;
};
export type Onclick = {
  click: string;
};

export type ResponseData = {
  ads: Array<Ipp | Onclick>;
};

export const getExitLinkFromBackendWithRotationInMarker = async (ippZone: number): Promise<string | Error> => {
  const url = makeExitUrl(ippZone, ExitType.ippWithRotationOnBackend) ?? '';

  try {
    const response = await fetch(url);
    const data: ResponseData = await response.json();

    if (!data || Object.keys(data).length === 0) {
      return new Error('no ad returned, means that user is a proxy');
    }

    const res = data.ads[0];
    if (!res) {
      return new Error('No ads found');
    }

    return createExitUrl(res.click);
  } catch (error: any) {
    return new Error('Error fetching data: ' + error.message);
  }
};

const createExitUrl = (clickUrl: string): string | Error => {
  const responseUrl = new URL(clickUrl);
  const searchParams = responseUrl.searchParams;

  if (searchParams.has('userId')) {
    return updateUrlAndCreateExit(clickUrl, 'onclick');
  } else if (searchParams.has('_z') && searchParams.has('b')) {
    return updateUrlAndCreateExit(clickUrl, 'ipp');
  } else {
    return new Error('Unknown link');
  }
};

const updateUrlAndCreateExit = (url: string, type: 'ipp' | 'onclick'): string => {
  const domain = type === 'ipp' ? process.env.PUBLIC_IPP_DOMAIN : process.env.PUBLIC_ONCLICK_DOMAIN;
  const code = type === 'ipp' ? '' : `/${process.env.PUBLIC_ONCLICK_CODE}`;
  const replacedUrl = url.replace(window.location.origin, `${domain}${code}`);

  const urlType = type === 'ipp' ? UrlType.ipp : UrlType.onclick;
  return makeExitUrlFromUrl(new URL(replacedUrl).href, urlType);
};

// onclick response: https://localhost/4292859/?var=&ymid=&b=&campaignid=&osversion=&click_id=&ab2r=&userId=d1c5e65eb3ce42efba09129a5f8567d6
// ipp response: https://localhost/clicks/mJ4cz5AayejE9t3ZtYdTGKlIuMzxmIlVjwgc6tq213uSnCeS44DXBe683lUwEwSbvln8Gh1V8cQsRn0_I4VU2Ds6cci85qG8nI8RGpmmkdw4XCzEFtaZ0dNmRMz1gDxXnNhFtZpodSkulY3_FJQNV2OaMuzb7ITl4mthfB7tFuhxcUpjefSSIA8HnM9V7-YqcpR9AzFiEEGY0_JjbhrwGTEfRqJH3u2WDBLyAmEHMYc1DGqYwCDU9sGAKnnR9cby0ftgcuCQSojfRt_OTMunwoLmEROoPdh5JBLLbJ_O1QXZAuXjt-x8UFbmMw9_JQV4wJmR4tAfmk-a5HvegVhbQ9tHF3OPLWAmo77ELzcLBCUcCHGYhqOgnhCD9jmoP4AXuRJK-MsNo3cmT4O_guUJP1Yhxb4ykO_9ChNHOjC0PlhclgV7XUQhDf7MgLQJOBzOsLU1HYycexBg2ZZLmlaySHDL2oRYIUEICcjwAsffci5Vl0k07pQZzVIbd9WkRSVEghuHzPZyte0bDNNOj_kmsxBhZlTtLvzY?_z=6020461&b=17917356
