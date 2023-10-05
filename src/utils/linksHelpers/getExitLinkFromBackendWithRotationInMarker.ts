import justLog from '@utils/justLog';
import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import makeExitUrlFromUrl, { UrlType } from '@utils/linksHelpers/makeExitUrlFromUrl';
import production from '@utils/simpleFunctions/isProduction';

export type Ipp = {
  click: string;
};
export type Onclick = {
  click: string;
};

export type ResponseData = {
  ads: Array<Ipp | Onclick>;
};

const createExitUrl = (clickUrl: string): string | Error => {
  const responseUrl = new URL(clickUrl);
  const searchParams = responseUrl.searchParams;

  if (searchParams.has('userId')) {
    return updateUrlAndCreateExit(clickUrl, 'onclick');
  } else if (searchParams.has('_z')) {
    return updateUrlAndCreateExit(clickUrl, 'ipp');
  } else {
    return new Error('Unknown link');
  }
};

// https://localhost/clicks/szBlYQzE0jiF_xfPTZFFqPnMAj25q52BIC26p9teF23Smz0U6IdhJ-kvWbCvmgXSgPCetPg8lDVl9Yji31v3-Ymn9xqUYtu3r-A_876vXtdFXQvxzipl-WD1Iyixphldf1vEVmE82Tt2e8mYXblNJ2uJA09VEprK_AD9hycLSyQDzcp8wla2UWj452kTzBcBW77m8-jesC-waYjjfBb46bZk-u_Nd7HrE9IxDSwunlpc_TkacRGugggsdKJtJiL4MzyZxrSoocZVSvyUhji8tRPCPcF8O2ftmde-rlfHwIpekfqsIMp30Z-4xJjesqSesbZeaSyg2nYyRQsytcZFxiVUdXj5ck9rcjtD5n0dpEPrrZSdCAhO3KiuVf56Lj3X-MpTcnm8PX-TGM1yrzcZv5JK0UYLkUrqWDb_SlQ4iC_2Axpp6tIQfdw-xM6qQ2kGX_HepT9R_ZugwbYiACo3wi_U_RVT9fEfaum54iPbELNcDL_Yd5VkeqDe7KzBTyWK8g5Q-5gQsEy1fCC8rCEwSzDMaffGjTCBHRXMxQ==?var=5908107&ymid=&b=19004022&campaignid=&os_version=&click_id=&ab2r=&oaid=&_z=5866173

const updateUrlAndCreateExit = (url: string, type: 'ipp' | 'onclick'): string => {
  if (production) {
    const urlType = type === 'ipp' ? UrlType.ipp : UrlType.onclick;
    return makeExitUrlFromUrl(url, urlType);
  } else {
    const domain = type === 'ipp' ? import.meta.env.PUBLIC_IPP_DOMAIN : import.meta.env.PUBLIC_ONCLICK_DOMAIN;
    const code = type === 'ipp' ? '' : `/${import.meta.env.PUBLIC_ONCLICK_CODE}`;
    const urlFromBackend = new URL(url);
    const replacedUrl = url.replace(urlFromBackend.origin, `${domain}${code}`);

    const urlType = type === 'ipp' ? UrlType.ipp : UrlType.onclick;
    return makeExitUrlFromUrl(new URL(replacedUrl).href, urlType);
  }
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
    justLog({ somethingToLog: `Response from backend: ${res.click}`, type: 'log' });

    if (!res) {
      return new Error('No ads found');
    }

    const resultFromRecursion = createExitUrl(res.click);
    justLog({ somethingToLog: `ResultFromRecursion: ${resultFromRecursion}`, type: 'log' });

    return resultFromRecursion;
  } catch (error: any) {
    return new Error('Error fetching data: ' + error.message);
  }
};

// onclick response: https://localhost/4292859/?var=&ymid=&b=&campaignid=&osversion=&click_id=&ab2r=&userId=d1c5e65eb3ce42efba09129a5f8567d6
// ipp response: https://localhost/clicks/mJ4cz5AayejE9t3ZtYdTGKlIuMzxmIlVjwgc6tq213uSnCeS44DXBe683lUwEwSbvln8Gh1V8cQsRn0_I4VU2Ds6cci85qG8nI8RGpmmkdw4XCzEFtaZ0dNmRMz1gDxXnNhFtZpodSkulY3_FJQNV2OaMuzb7ITl4mthfB7tFuhxcUpjefSSIA8HnM9V7-YqcpR9AzFiEEGY0_JjbhrwGTEfRqJH3u2WDBLyAmEHMYc1DGqYwCDU9sGAKnnR9cby0ftgcuCQSojfRt_OTMunwoLmEROoPdh5JBLLbJ_O1QXZAuXjt-x8UFbmMw9_JQV4wJmR4tAfmk-a5HvegVhbQ9tHF3OPLWAmo77ELzcLBCUcCHGYhqOgnhCD9jmoP4AXuRJK-MsNo3cmT4O_guUJP1Yhxb4ykO_9ChNHOjC0PlhclgV7XUQhDf7MgLQJOBzOsLU1HYycexBg2ZZLmlaySHDL2oRYIUEICcjwAsffci5Vl0k07pQZzVIbd9WkRSVEghuHzPZyte0bDNNOj_kmsxBhZlTtLvzY?_z=6020461&b=17917356
