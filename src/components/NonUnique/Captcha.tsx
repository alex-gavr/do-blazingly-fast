interface ICaptchaProps {
  handleNonUnique: () => void;
}

const Captcha = ({ handleNonUnique }: ICaptchaProps) => {
  return (
    <div
      className='flex h-screen w-full flex-col items-center justify-center gap-8 bg-[url("/img/captcha/bg.png")] bg-cover bg-center bg-no-repeat p-4'
      onClick={handleNonUnique}
    >
      <h1 className='text-center text-3xl font-bold tracking-wide'>Confirm you are not a robot</h1>
      <div className='flex w-full max-w-sm flex-row  items-center justify-center bg-slate-50 p-2 pl-4 pr-0 shadow-2xl'>
        <div className='flex h-full flex-1 flex-row items-center justify-center gap-4 '>
          <span className='h-6 w-6 border-2 border-neutral-400' />
          <p className='text-2xl tracking-wider text-slate-900'>Confirm</p>
        </div>

        <div className='flex w-2/5 flex-shrink-0 flex-col items-center justify-center border-l-2 border-neutral-300'>
          <svg viewBox='0 0 46 46' xmlns='http://www.w3.org/2000/svg' className='w-14'>
            <path
              d='M6.609375 37.574219L20.328125 45.5l13.71875-7.925781-13.71875-14zM5.761719 33.375l11.921875-12.5-3.191406-3.273438zM23 20.824219L34.894531 33.375l-6.808593-12.074219 2.84375-2.902343 8.230468 16.203124.972656-.578124V11.101562l-4.863281-2.828124zM18.832031.5L.5 11.101562v22.921876l.972656.578124 12.023438-23.625 6.859375 7.097657 3.816406-4-3.84375-7.25-1.894531 3.476562-3.019532-3.101562zm2.992188 0l5.339843 10.476562 4.566407-4.75zm0 0'
              fill='#00dcc8'
            ></path>
          </svg>
          <p className='text-center text-xs text-slate-400'>Protected By Adex.com</p>
        </div>
      </div>
    </div>
  );
};

export default Captcha;
