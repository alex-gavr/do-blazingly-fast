interface IPushWindowProps {
  handleNonUnique: () => void;
}

const PushWindow = ({ handleNonUnique }: IPushWindowProps) => {
  return (
    <div
      className='absolute top-0 z-20 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-gray-950 bg-opacity-50 px-4'
      onClick={handleNonUnique}
    >
      <div className='w-full max-w-sm rounded-md bg-white px-6 py-4'>
        <div className='flex flex-col items-start justify-center gap-8'>
          <div className='flex flex-row items-center justify-start gap-4'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' class='h-6 w-6 flex-shrink-0 fill-blue-700'>
              <path d='M4.214 3.227a.75.75 0 00-1.156-.956 8.97 8.97 0 00-1.856 3.826.75.75 0 001.466.316 7.47 7.47 0 011.546-3.186zM16.942 2.271a.75.75 0 00-1.157.956 7.47 7.47 0 011.547 3.186.75.75 0 001.466-.316 8.971 8.971 0 00-1.856-3.826z' />
              <path
                fill-rule='evenodd'
                d='M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.94 32.94 0 003.256.508 3.5 3.5 0 006.972 0 32.933 32.933 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zm0 14.5a2 2 0 01-1.95-1.557 33.54 33.54 0 003.9 0A2 2 0 0110 16.5z'
                clip-rule='evenodd'
              />
            </svg>
            <h1 className='text-sm tracking-wider text-gray-900'>Allow online test to send you notifications</h1>
          </div>
          <div className='flex flex-row items-center justify-center gap-12 place-self-end'>
            <p className='tracking-wide text-blue-700'>Block</p>
            <p className='tracking-wide text-blue-700'>Allow</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushWindow;
