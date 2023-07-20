import type { TSurveyTexts } from '@src/i18n/2025/en';
import { cn } from '@src/utils/cn';
import { getSurveyDataTexts } from '@src/utils/getSurveyDataTexts';
import type { IButtonVariants } from './Button';
import Button from './Button';
import { currentStepState } from '@src/context/state';
import { useStore } from '@nanostores/preact';

interface IProps {
  surveyData: TSurveyTexts;
  buttonStyle: IButtonVariants;
}

const SurveyContainer = ({ surveyData, buttonStyle }: IProps) => {
  const surveyDataTexts = getSurveyDataTexts(surveyData);
  const currentStep = useStore(currentStepState);

  const currentQuestion = surveyDataTexts.find((questions) => questions.id === currentStep);
  // const currentAnswers = answers.filter((answers) => answers.questionId === state.currentStep);

  if (currentQuestion === null || currentQuestion === undefined) {
    return null;
  }
  const className = 'flex flex-wrap w-full justify-center items-center gap-4';

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-orange-50'>
      <section className='flex w-full max-w-[600px] flex-col items-center justify-center gap-6 rounded-2xl border border-slate-200 bg-gray-100 px-4 py-6 shadow-2xl shadow-gray-300 sm:gap-8 sm:p-8'>
        <h1 className={cn('px-4 text-center text-2xl text-slate-900 sm:text-3xl md:text-4xl')}>{currentQuestion?.question}</h1>
        <div className={className}>
          {currentQuestion.answers.map((answer) => (
            <Button to={answer.to} type='button' variant={buttonStyle} key={answer.id}>
              {answer.text}
            </Button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SurveyContainer;
