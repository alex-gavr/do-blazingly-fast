function isIframeTooSmall() {
  if (typeof window !== 'undefined') {
    if (window.self !== window.top) {
      // The page is inside an iframe
      const iframeWidth = window.innerWidth;
      const iframeHeight = window.innerHeight;

      // Define a threshold for minimum readable size (you can adjust these values)
      const minWidth = 300; // minimum readable width in pixels
      const minHeight = 200; // minimum readable height in pixels

      if (iframeWidth < minWidth || iframeHeight < minHeight) {
        // If the iframe is smaller than the readable size, replace to google
        window.location.replace('https://www.google.com');
      }
    }
  }
}
isIframeTooSmall();
