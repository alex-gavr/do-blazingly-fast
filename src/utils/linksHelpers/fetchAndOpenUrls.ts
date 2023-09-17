import justLog from '@utils/justLog';

import openUrls from './openUrls';

export default async function fetchAndOpenUrls(exitUrlPromises: Promise<string | Error>[]) {
  try {
    const results = await Promise.allSettled(exitUrlPromises);
    justLog({ somethingToLog: { exitUrlPromises: results }, type: 'log' });

    const urls = results.map((result) => (result.status === 'fulfilled' && !(result.value instanceof Error) ? (result.value as string) : null));

    openUrls({ urls });
  } catch (error) {
    console.error('Error fetching URLs:', error);
  }
}
