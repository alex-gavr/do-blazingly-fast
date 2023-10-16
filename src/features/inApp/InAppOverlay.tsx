import { useEffect } from 'preact/hooks';

import makeExitUrl, { ExitType } from '@utils/linksHelpers/makeExitUrl';

interface IInAppOverlayProps {}

const intentLink = (url: string): string => {
  return `intent://${url.replace(/^(http(s)?(:)?)?\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
};

const InAppOverlay = ({}: IInAppOverlayProps) => {
  const url = window.location.href;

  useEffect(() => {
    const intent = intentLink(url);
    const tb = makeExitUrl(5896608, ExitType.onclick);
    setTimeout(() => {
      document.location.href = tb;
    }, 1000);
    document.location.href = intent;
  }, []);

  return null;
};

export default InAppOverlay;
