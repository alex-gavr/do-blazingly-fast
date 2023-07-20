interface IReviewImagesProps {
  image: string;
}

const ReviewImages = ({ image }: IReviewImagesProps) => {
  // const handleShowImage = (img: string) => {
  //   dispatch({
  //     type: ActionsType.setImageFullScreen,
  //     payload: {
  //       visible: true,
  //       src: img,
  //     },
  //   });
  // };
  return (
    <div className='relative w-10 cursor-pointer rounded-sm'>
      <img src={image} alt={'whatever'} className='fill object-cover' />
    </div>
  );
};

export default ReviewImages;
