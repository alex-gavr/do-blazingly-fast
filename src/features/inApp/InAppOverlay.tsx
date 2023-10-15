interface IInAppOverlayProps {}

const InAppOverlay = ({}: IInAppOverlayProps) => {
  const url = window.location.href;

  const href = `googlechrome://navigate?url=${url}`;
  console.log('🚀 ~ href:', href);
  return <a href={href} target='_system' className='inset-0 fixed z-[9999]' />;
};

export default InAppOverlay;
