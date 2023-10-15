import storageService from '@utils/storageService';

import inAppUrlForRedirect from './urlForRedirect';

/**
 * @func inAppClick - check if page opened in webview (in app) and create cover element with call @param inAppRedirect on click
 */

const inAppClick = (params: string, typeApp: string | number) => {
  // create cover element for catch click
  const inAppCover: HTMLDivElement = document.createElement('div');

  inAppCover.style.position = 'fixed';
  inAppCover.style.top = '0';
  inAppCover.style.width = '100%';
  inAppCover.style.height = '100%';
  inAppCover.style.zIndex = '999999999';
  inAppCover.onclick = () => {
    inAppUrlForRedirect(params, typeApp);
    storageService.set('clickInApp', false);
  };
  document.body.appendChild(inAppCover);
};

export default inAppClick;
