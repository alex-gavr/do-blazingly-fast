import { useStore } from '@nanostores/preact';

import type { TValidOffer } from '@config/globalConfig';

import { currentStepState } from '@context/state';

import type { TSurveyTexts } from '@i18n/2025/en';

import { cn } from '@utils/cn';
import { getSurveyDataTexts } from '@utils/getSurveyDataTexts';

import Button, { type IButtonStyles } from '@components/Button';

interface ISurveyProps {
  texts: TSurveyTexts;
  offerId: TValidOffer;
  classNameText?: string;
  classNameAnswersContainer?: string;
  buttonVariant?: IButtonStyles['variant'];
  fontSize?: IButtonStyles['fontSize'];
  padding?: IButtonStyles['padding'];
  rounded?: IButtonStyles['rounded'];
  className?: string;
}

const SurveyContainer = ({
  texts,
  offerId,
  classNameText,
  classNameAnswersContainer,
  buttonVariant,
  fontSize,
  padding,
  rounded,
  className,
}: ISurveyProps) => {
  const surveyData = getSurveyDataTexts(texts, offerId);
  const currentStep = useStore(currentStepState);
  const filteredQuestion = surveyData.filter((question) => question.id === currentStep)[0];

  return (
    <>
      <h1 className={cn('text-center text-2xl font-bold', classNameText)}>{filteredQuestion.question}</h1>
      <div className={cn('grid w-full grid-cols-1 gap-2 sm:grid-cols-2 mt-2 md:mt-4', classNameAnswersContainer)}>
        {filteredQuestion.answers.map((answer) => (
          <Button
            to={answer.to}
            type={'button'}
            key={answer.id}
            fontSize={fontSize ? fontSize : 'base'}
            padding={padding ? padding : 'wider'}
            rounded={rounded ? rounded : 'none'}
            variant={buttonVariant ? buttonVariant : 'finance'}
            className={className}
          >
            {answer.text}
          </Button>
        ))}
      </div>
    </>
  );
};

export default SurveyContainer;
