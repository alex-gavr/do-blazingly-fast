interface IAssessmentProps {}

const Assessment = ({}: IAssessmentProps) => {
  return (
    <div className='z-50 flex min-h-[70vh] flex-col items-start justify-center gap-6 rounded-md bg-neutral-900 px-4 py-6 relative'>
      <h1 className='animate-fade-up text-center text-3xl font-bold'>Will you make $5,000+ daily?</h1>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row gap-2'>
          <p className='animate-fade-up text-sm animate-delay-700 sm:text-base'>Wait... Checking answers</p>
          <img src='/img/tick.svg' alt='tick' className='h-5 w-5 animate-fade-left animate-delay-1000' />
        </div>
        <div className='flex flex-row gap-2'>
          <p className='animate-fade-up text-sm animate-delay-[1.5s] sm:text-base'>Wait... Counting your score</p>
          <img src='/img/tick.svg' alt='tick' className='h-5 w-5 animate-fade-left animate-delay-[2s]' />
        </div>
      </div>
      <div className='mb-4 h-2.5 w-full rounded-full bg-gray-700'>
        <div className='h-2.5 animate-widthGrowth rounded-full bg-yellow-500 animate-duration-[3s] animate-ease-in-out' />
      </div>
    </div>
  );
};

export default Assessment;
