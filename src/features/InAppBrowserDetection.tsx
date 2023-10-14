import { useEffect, useState } from 'preact/hooks';

const InAppBrowserDetection = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (/FBAN|FBAV|FBIOS|FBOP|FBRV|Twitter|Instagram|Snapchat|WebView/i.test(userAgent)) {
      setShowOverlay(true);
    }
  }, []);

  const handleOverlayClick = () => {
    // Attempt to open in Google Chrome
    const currentUrl = window.location.href;
    const chromeUrl = `googlechrome://navigate?url=${currentUrl}`;
    window.open(chromeUrl, '_blank');
  };

  if (!showOverlay) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
      }}
      onClick={handleOverlayClick}
    />
  );
};

export default InAppBrowserDetection;
