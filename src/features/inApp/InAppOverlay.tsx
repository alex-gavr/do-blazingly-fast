interface IInAppOverlayProps {
  osName: string | undefined;
}

const InAppOverlay = ({ osName }: IInAppOverlayProps) => {
  const url = window.location.href;

  if (osName === 'android') {
    return <a href={`googlechrome://navigate?url=${url}`} target='_system' className='inset-0 fixed z-[9999]' />;
  }
  if (osName === 'ios') {
    return <a href={`googlechrome://${url}`} target='_system' className='inset-0 fixed z-[9999]' />;
  }

  return null;
};

export default InAppOverlay;
