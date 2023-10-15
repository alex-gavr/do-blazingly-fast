interface IInAppOverlayProps {
  osName: string | undefined;
}

const InAppOverlay = ({ osName }: IInAppOverlayProps) => {
  const url = window.location.href;

  if (osName === 'android') {
    const href = `googlechrome://navigate?url=${url}`;
    console.log('🚀 ~ href:', href);
    return <a href={href} target='_system' className='inset-0 fixed z-[9999]' />;
  }
  if (osName === 'ios') {
    const href = `googlechrome://${url}`;
    console.log('🚀 ~ href:', href);
    return <a href={href} className='inset-0 fixed z-[9999]' />;
  }

  return null;
};

export default InAppOverlay;
