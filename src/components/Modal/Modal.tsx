import { initBack } from '@monetization/Back';
import { IPPZones } from '@monetization/NonUnique';
import { useStore } from '@nanostores/preact';
import { Cookies } from 'typescript-cookie';

import { exitsUrlsState, modalState, rewardisExitsState, rewardisUrlState } from '@context/state';

import openUrlInNewTab from '@utils/simpleFunctions/openUrlInNewTab';
import replaceCurrentUrl from '@utils/simpleFunctions/replaceCurrentUrl';

interface ModalProps {}

const Modal = ({}: ModalProps) => {
  const { isOpen, imageUrl, title, description, onCloseText, description2, isWinningModal } = useStore(modalState);
  const rewardisExits = rewardisExitsState.get();
  const rewardisUrl = rewardisUrlState.get();
  const exitsUrls = useStore(exitsUrlsState);

  if (!isOpen) {
    return null;
  }

  const handleClose = async () => {
    if (isWinningModal) {
      const newTab = rewardisUrl;
      const currentTab = exitsUrls.exitsUrls.filter((exit) => exit.zoneName === IPPZones.mainExitCurrentTab)[0].url;
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
      <div className='rounded-lg bg-white z-50 p-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm flex flex-col items-center justify-center gap-6'>
        {imageUrl && (
          <div>
            <img src={imageUrl} alt='' />
          </div>
        )}

        <div className='flex flex-col justify-center items-center gap-3 pt-4'>
          <h3 className='text-center text-black font-bold text-3xl tracking-wider'>{title}</h3>
          {description && <h4 className='text-lg font-bold text-emerald-500 text-center tracking-wide'>{description}</h4>}
          {description2 && <p className='text-base font-bold text-slate-700 text-center w-10/12 tracking-wide lowercase'>{description2}</p>}
        </div>

        <button onClick={handleClose} className='bg-indigo-700 text-white rounded-2xl w-full text-lg py-3 px-2 tracking-wider uppercase'>
          {onCloseText}
        </button>
      </div>
      <div className='absolute inset-0 bg-black/50 z-40' onClick={handleClose} />
    </div>
  );
};

export default Modal;
