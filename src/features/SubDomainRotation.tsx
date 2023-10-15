import { useEffect } from 'preact/hooks';

interface ISubDomainRotationProps {}

const generateRandomSubdomain = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 3; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const SubDomainRotation = ({}: ISubDomainRotationProps) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const rotated = urlParams.get('rotated');
    const hostSegments = window.location.host.split('.');

    // Skip the rotation if the 'rotated' query parameter is present
    if (rotated === 'true') {
      return;
    }

    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        const newSubdomain = generateRandomSubdomain();
        const subdomainName = window.location.host.split('.')[0];

        let newHost;
        if (subdomainName.length !== 3) {
          // without first subdomain
          newHost = `${newSubdomain}.${window.location.host}`;
        } else if (hostSegments.length === 2) {
          // without first subdomain
          newHost = `${newSubdomain}.${window.location.host.split('.')[1]}`;
        } else {
          newHost = `${newSubdomain}.${window.location.host.split('.')[1]}.${window.location.host.split('.')[2]}`;
        }

        // Merge existing search params and add the 'rotated' flag
        urlParams.set('rotated', 'true');

        // Construct new URL with existing and new search params
        const newUrl = `${window.location.protocol}//${newHost}${window.location.pathname}?${urlParams.toString()}`;

        window.location.href = newUrl;
      });
    }
  }, []);
  return null;
};

export default SubDomainRotation;
