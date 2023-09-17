import openUrlInNewTab from './openUrlInNewTab';
import replaceCurrentUrl from './replaceCurrentUrl';

export default async function fetchAndOpenUrls(exitUrlPromises: Promise<string | Error>[]) {
  try {
    const results = await Promise.allSettled(exitUrlPromises);

    const urls = results.map((result) => (result.status === 'fulfilled' && !(result.value instanceof Error) ? (result.value as string) : null));

    urls.forEach((url, index) => {
      if (url) {
        if (index === 0) {
          openUrlInNewTab(url);
        } else if (index === 1) {
          replaceCurrentUrl(url);
        } else {
          openUrlInNewTab(url); // any size of zones is possible
        }
      }
    });
  } catch (error) {
    console.error('Error fetching URLs:', error);
  }
}
