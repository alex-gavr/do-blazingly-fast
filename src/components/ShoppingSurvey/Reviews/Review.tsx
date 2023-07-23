import { cn } from '@utils/cn';
import ReviewImages from './ReviewImages';
import LikeButton from '@src/components/LikeButton';

interface IReview {
  id: number;
  title: string;
  text: string;
  likes: number;
  rating: number;
  personImage: string;
  personName: string;
  winImages?: Array<string>;
}
interface IReviewProps {
  review: IReview;
}

const Review = ({ review }: IReviewProps) => {
  return (
    <div className='relative mr-1 flex flex-col rounded-md bg-orange-50 p-2 shadow-md sm:flex-row'>
      <LikeButton likes={review.likes} />
      <div className='flex items-center sm:flex-col sm:items-start'>
        <img
          src={review.personImage}
          alt={`${review.personName}.`}
          width={600}
          height={600}
          loading={'lazy'}
          className='h-12 w-12 rounded-full object-cover'
        />

        <div className='ml-4 sm:ml-0 sm:mt-4'>
          <p className='text-base text-gray-900'>{review.personName}</p>
          <div className='mt-1 flex items-center'>
            {[0, 1, 2, 3, 4].map((rating) => (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
                className={cn(review.rating > rating ? 'text-yellow-400' : 'text-gray-300', 'h-5 w-5 flex-shrink-0')}
              >
                <path
                  fill-rule='evenodd'
                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                  clip-rule='evenodd'
                />
              </svg>
            ))}
          </div>
          <p className='mt-1 text-[0.6rem] italic text-gray-950'>{review.rating} out of 5 stars</p>
        </div>
      </div>

      <div className='mt-6 sm:ml-4 sm:mt-0'>
        <h3 className='text-sm font-medium text-gray-950'>{review.title}</h3>

        <div className='mt-2 flex flex-col gap-2 text-sm text-gray-600 sm:pr-10'>
          <p className='text-sm text-neutral-600'>{review.text}</p>{' '}
          <div className=' flex flex-row justify-start gap-2'>
            {review.winImages && review.winImages.length > 0 && review.winImages.map((image, i) => <ReviewImages key={i} image={image} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
