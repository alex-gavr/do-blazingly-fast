import { useStore } from '@nanostores/preact';

import type { TValidOffer } from '@config/globalConfig';

import { currentStepState } from '@context/state';

import type { TSurveyTexts } from '@i18n/2025/en';

import { getSurveyDataTexts } from '@utils/getSurveyDataTexts';

import Button from '@components/Button';

interface ISurveyProps {
  texts: TSurveyTexts;
  offerId: TValidOffer;
}

const SurveyContainer = ({ texts, offerId }: ISurveyProps) => {
  const surveyData = getSurveyDataTexts(texts, offerId);
  const currentStep = useStore(currentStepState);
  const filteredQuestion = surveyData.filter((question) => question.id === currentStep)[0];

  return (
    <>
      <h1 className={'text-center text-2xl font-bold'}>{filteredQuestion.question}</h1>
      <div className={'grid w-full grid-cols-1 gap-2 sm:grid-cols-2'}>
        {filteredQuestion.answers.map((answer) => (
          <Button to={answer.to} type={'button'} key={answer.id} fontSize={'base'} padding={'wider'} rounded={'none'} variant={'finance'}>
            {answer.text}
          </Button>
        ))}
      </div>
    </>
  );
};

export default SurveyContainer;
