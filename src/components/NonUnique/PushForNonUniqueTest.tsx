import { useEffect, useState } from 'preact/hooks';

interface IInitPushProps {}

const StartPush = ({}: IInitPushProps) => {
  const [done, setDone] = useState<boolean>(false);

  const startPush = async () => {
    const { default: pushMicroTagScript } = await import('@components/Monetization/pushMicroTagScript');

    pushMicroTagScript({ pushZone: 6156874 });
    setDone(true);
  };

  useEffect(() => {
    if (!done) {
      startPush();
    }
  }, [done]);
  return null;
};

export default StartPush;
