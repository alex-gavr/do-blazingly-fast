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
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // Generate a random 3-character subdomain and navigate to it
          const subdomain = generateRandomSubdomain();
          window.location.hostname = `${subdomain}.${window.location.hostname}`;
        }
      });
    }
  }, []);
  return null;
};

export default SubDomainRotation;
