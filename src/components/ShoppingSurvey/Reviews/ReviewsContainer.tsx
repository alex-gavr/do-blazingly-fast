import type { ComponentChild } from 'preact';
import Review from './Review';
import type { TShoppingSurveyDictionary } from '@src/i18n/10864/en';

interface IReviewsContainerProps {
  title?: TShoppingSurveyDictionary['commentSection']['title'];
  comments?: TShoppingSurveyDictionary['commentSection']['shoppingReviews'];
}

const ReviewsContainer = ({ title = 'Latest winners!', comments }: IReviewsContainerProps) => {
  return (
    <section className='flex w-full max-w-3xl flex-col gap-2'>
      <h1 className='text-2xl tracking-wider text-slate-950'>{title}</h1>
      <div className='flex max-h-[350px] w-full flex-col gap-4 overflow-y-auto px-1 py-2'>
        {comments?.map((review) => (
          <Review review={review} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsContainer;
