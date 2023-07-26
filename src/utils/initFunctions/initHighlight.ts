import { H } from 'highlight.run';
H.init('jgo8w5el', {
  // Get your project ID from https://app.highlight.io/setup
  environment: 'production',
  version: '1',
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: true,
    urlBlocklist: [
      // insert full or partial urls that you don't want to record here
      // Out of the box, Highlight will not record these URLs (they can be safely removed):
      'https://www.googleapis.com/identitytoolkit',
      'https://securetoken.googleapis.com',
      'https://adsterra.com',
    ],
  },
});
