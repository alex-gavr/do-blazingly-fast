import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';
import makeExitUrlFromUrl, { UrlType } from '@utils/linksHelpers/makeExitUrlFromUrl';
import triggerImpression from '@utils/simpleFunctions/triggerImpression';

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

type ApiResponse = {
  ads: IppData[];
};

const fetchIppData = async (zone: number): Promise<ApiResponse | null> => {
  const url = makeExitUrl(zone, ExitType.ipp) ?? '';
  try {
    const response = await fetch(url);
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getIppLink = async (zone: number): Promise<string | null> => {
  const data = await fetchIppData(zone);
  if (data && data.ads.length > 0) {
    const res = data.ads[0];
    triggerImpression(res.impression_url);
    return makeExitUrlFromUrl(res.click, UrlType.ipp);
  } else {
    console.error('No ads data', data);
    return null;
  }
};

export const getIppIfErrorGetOnclick = async (ippZone: number, onclickZone: number) => {
  const getIpp = await getIppLink(ippZone);

  if (!getIpp) {
    const getOnclick = makeExitUrl(onclickZone, ExitType.onclick);
    return getOnclick;
  } else {
    return getIpp;
  }
};
