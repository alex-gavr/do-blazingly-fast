import { useStore } from '@nanostores/preact';

import { currentStepState } from '@context/state';

import type { TSurveyTexts } from '@i18n/2025/en';

import { getSurveyDataTexts } from '@utils/getSurveyDataTexts';

import Button from './Button';

interface ISurveyProps {
  texts: TSurveyTexts;
}

const Survey = ({ texts }: ISurveyProps) => {
  const surveyData = getSurveyDataTexts(texts);
  const currentStep = useStore(currentStepState);
  const filteredQuestion = surveyData.filter((question) => question.id === currentStepState.value)[0];

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

export default Survey;
