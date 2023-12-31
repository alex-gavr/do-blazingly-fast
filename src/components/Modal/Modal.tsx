import { initBack } from '@monetization/Back';
import { IPPZones } from '@monetization/NonUnique';
import { useStore } from '@nanostores/preact';
import { Cookies } from 'typescript-cookie';

import { modalState, rewardisUrlState } from '@context/state';

import getUrlFromContextBasedOnZone from '@utils/getUrlFromContext';
import openUrlInNewTab from '@utils/simpleFunctions/openUrlInNewTab';
import replaceCurrentUrl from '@utils/simpleFunctions/replaceCurrentUrl';

const Modal = ({}) => {
  const { isOpen, imageUrl, title, description, onCloseText, description2, isWinningModal } = useStore(modalState);

  const rewardisUrl = rewardisUrlState.get();

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    if (isWinningModal) {
      const newTab = rewardisUrl;
      // const currentTab = getUrlFromContextBasedOnZone({ exitZone: IPPZones.mainExitCurrentTab });
      const currentTab = getUrlFromContextBasedOnZone({ exitZone: IPPZones.tabUnderCurrentTab });
      Cookies.set('nonUnique', 'true', { expires: 7 });
      initBack();
      openUrlInNewTab(newTab);
      replaceCurrentUrl(currentTab);
    }
    modalState.set({
      isOpen: false,
      isWinningModal: false,
      title: '',
      description: '',
      description2: '',
      imageUrl: '',
      onCloseText: 'OK',
    });
  };

  return (
    <div class='fixed inset-0 rounded-3xl z-50'>
      <div className='rounded-lg w-[95%] bg-white z-50 p-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm flex flex-col items-center justify-center gap-4'>
        {imageUrl && (
          <div>
            <img src={imageUrl} alt='' width={241} height={184} className={'w-48'} />
          </div>
        )}
        <div className='flex flex-col justify-center items-center gap-3 pt-4'>
          <h3 className='text-center text-black font-bold text-2xl tracking-wider'>{title}</h3>
          {description && <h4 className='text-base font-bold text-slate-800 text-center tracking-wide'>{description}</h4>}
          {description2 && <p className='text-base font-bold text-emerald-500 text-center w-10/12 tracking-wide capitalize'>{description2}</p>}
        </div>

        <button onClick={handleClose} className='bg-blue-700 text-white rounded-md w-full text-lg py-3 px-2 tracking-wider uppercase'>
          {onCloseText}
        </button>
      </div>
      <div className='absolute inset-0 bg-black/50 z-40' onClick={handleClose} />
    </div>
  );
};

export default Modal;
