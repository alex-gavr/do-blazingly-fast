import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';
import openUrlInNewTab from '@utils/simpleFunctions/openUrlInNewTab';
import replaceCurrentUrl from '@utils/simpleFunctions/replaceCurrentUrl';

type OpenUrls = {
  urls: (string | null)[] | null[] | string[];
};

const openUrls = ({ urls }: OpenUrls): void => {
  urls.forEach((url, index) => {
    if (url && production && !debug) {
      if (index === 0) {
        openUrlInNewTab(url);
      } else if (index === 1) {
        replaceCurrentUrl(url);
      } else {
        openUrlInNewTab(url);
      }
    }
  });
};
export default openUrls;
