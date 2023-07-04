import production from './isProduction';
import makeExitUrl, { ExitType } from './makeExitUrl';
import makeExitUrlFromUrl, { UrlType } from './makeExitUrlFromUrl';

export type Ipp = {
  click: string;
};
export type Onclick = {
  click: string;
};

// pass IPP zone. Get back ipp or onclick link
export const getExitLinkFromBackend = async (ippZone: number) => {
  const url = makeExitUrl(ippZone, ExitType.ippWithRotationOnBackend) ?? '';

  const data = await fetch(url).then((res) => res.json());
  const res = data.ads[0] as Ipp | Onclick;

  // onclick response: https://localhost/4292859/?var=&ymid=&b=&campaignid=&osversion=&click_id=&ab2r=&userId=d1c5e65eb3ce42efba09129a5f8567d6
  // ipp response: https://localhost/clicks/mJ4cz5AayejE9t3ZtYdTGKlIuMzxmIlVjwgc6tq213uSnCeS44DXBe683lUwEwSbvln8Gh1V8cQsRn0_I4VU2Ds6cci85qG8nI8RGpmmkdw4XCzEFtaZ0dNmRMz1gDxXnNhFtZpodSkulY3_FJQNV2OaMuzb7ITl4mthfB7tFuhxcUpjefSSIA8HnM9V7-YqcpR9AzFiEEGY0_JjbhrwGTEfRqJH3u2WDBLyAmEHMYc1DGqYwCDU9sGAKnnR9cby0ftgcuCQSojfRt_OTMunwoLmEROoPdh5JBLLbJ_O1QXZAuXjt-x8UFbmMw9_JQV4wJmR4tAfmk-a5HvegVhbQ9tHF3OPLWAmo77ELzcLBCUcCHGYhqOgnhCD9jmoP4AXuRJK-MsNo3cmT4O_guUJP1Yhxb4ykO_9ChNHOjC0PlhclgV7XUQhDf7MgLQJOBzOsLU1HYycexBg2ZZLmlaySHDL2oRYIUEICcjwAsffci5Vl0k07pQZzVIbd9WkRSVEghuHzPZyte0bDNNOj_kmsxBhZlTtLvzY?_z=6020461&b=17917356

  const responseUrl = new URL(res.click);
  const searchParams = responseUrl.searchParams;

  if (searchParams.has('userId')) {
    //  DOES THIS WOKR?
    const updatedOnclickLink = res.click.replace(
      window.location.origin,
      `${import.meta.env.PUBLIC_ONCLICK_DOMAIN}/${import.meta.env.PUBLIC_ONCLICK_CODE}`,
    );
    const responseUrl = new URL(updatedOnclickLink);

    const newExitUrl = makeExitUrlFromUrl(responseUrl.href, UrlType.onclick);
    return newExitUrl;
  } else if (searchParams.has('_z') && searchParams.has('b')) {
    
    const replacedUrl = res.click.split('/clicks')[1];
    
    const updatedIppLink = `${import.meta.env.PUBLIC_IPP_DOMAIN}/clicks${replacedUrl}`
    // const updatedIppLink = res.click.replace(window.location.origin, `${import.meta.env.PUBLIC_IPP_DOMAIN}`);
    const responseUrl = new URL(updatedIppLink);

    const newExitUrl = makeExitUrlFromUrl(responseUrl.href, UrlType.ipp);
    
    return newExitUrl;
  } else {
    throw new Error('WTF is this link?');
  }
};
