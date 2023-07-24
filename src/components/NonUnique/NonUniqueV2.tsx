interface INonUniqueV2Props {}

const NonUniqueV2 = ({}: INonUniqueV2Props) => {
  const handleClick = async () => {
    // const { initBack } = await import('@components/Monetization/Back');
    const { default: makeExitUrl, ExitType } = await import('@utils/makeExitUrl');

    const mainNonUnique = 6156809;
    const popsNonUnique = 6156819;
    // const backNonUnique = 6156821;
    const main = makeExitUrl(mainNonUnique, ExitType.onclick);
    const pops = makeExitUrl(popsNonUnique, ExitType.onclick);

    // initBack(backNonUnique);
    window.open(main, '_blank');
    window.location.replace(pops);
  };

  return (
    <div
      className='absolute top-0 z-20 flex h-screen w-screen flex-col items-center justify-center bg-gray-700 bg-opacity-10 bg-clip-padding backdrop-blur-md backdrop-filter'
      onClick={handleClick}
    >
      <p className='rounded-md bg-red-500 p-4 text-center text-2xl uppercase tracking-widest sm:text-3xl md:text-4xl lg:text-5xl'>
        click to continue
      </p>
    </div>
  );
};

export default NonUniqueV2;
