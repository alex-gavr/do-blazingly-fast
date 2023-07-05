import exitZones from '@config/2025';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import production from '@utils/isProduction';
import { useState } from 'preact/hooks';
import { setCookie } from 'typescript-cookie';
import { initBack } from './Monetization/Back';

interface ISurveyProps {}

enum LeadsTo {
  nextQuestion = 'nextQuestion',
  teenExit = 'teenExit',
  thankYouPage = 'thankYouPage',
}

const data = [
  {
    id: 1,
    question: 'What is your gender?',
    answers: [
      {
        id: 1,
        text: 'Man',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 2,
        text: 'Woman',
        to: LeadsTo.nextQuestion,
      },
    ],
  },
  {
    id: 2,
    question: 'How old are you?',
    answers: [
      {
        id: 1,
        text: 'less than 18 years',
        to: LeadsTo.teenExit,
      },
      {
        id: 2,
        text: '18-29 years',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 3,
        text: '30-49 years',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 4,
        text: '50-80 years',
        to: LeadsTo.nextQuestion,
      },
    ],
  },
  {
    id: 3,
    question: 'How do you make a living?',
    answers: [
      {
        id: 1,
        text: 'I work',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 2,
        text: 'I am self-employed',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 3,
        text: 'I am unemployed',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 4,
        text: 'I am a pensioner',
        to: LeadsTo.nextQuestion,
      },
    ],
  },
  {
    id: 4,
    question: 'What is your average income per year?',
    answers: [
      {
        id: 1,
        text: 'less than $10,000',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 2,
        text: '$10,000-$30,000',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 3,
        text: '$30,000-$50,000',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 4,
        text: 'more than $50,000',
        to: LeadsTo.nextQuestion,
      },
    ],
  },
  {
    id: 5,
    question: 'What is your financial goal for the next 5 years?',
    answers: [
      {
        id: 1,
        text: 'Go on a family holiday',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 2,
        text: 'Buy a supercar',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 3,
        text: 'Buy an apartment or a house',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 4,
        text: 'Start my own business',
        to: LeadsTo.nextQuestion,
      },
    ],
  },
  {
    id: 6,
    question: 'How much would you invest right now to get closer to your financial goal much faster?',
    answers: [
      {
        id: 1,
        text: 'less than $250',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 2,
        text: '$250-$500',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 3,
        text: '$500-$1000',
        to: LeadsTo.nextQuestion,
      },
      {
        id: 4,
        text: 'more than $1000',
        to: LeadsTo.nextQuestion,
      },
    ],
  },
  {
    id: 7,
    question: 'Do you have any experience in Bitcoin trading?',
    answers: [
      {
        id: 1,
        text: 'No, I have never heard of it',
        to: LeadsTo.thankYouPage,
      },
      {
        id: 2,
        text: 'No, but I want to try',
        to: LeadsTo.thankYouPage,
      },
      {
        id: 3,
        text: 'Yes, I am a beginner',
        to: LeadsTo.thankYouPage,
      },
      {
        id: 4,
        text: 'Yes, I do it professionally',
        to: LeadsTo.thankYouPage,
      },
    ],
  },
];

const Survey = ({}: ISurveyProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const filteredQuestion = data.filter((question) => question.id === currentQuestion)[0];

  const handleButtonClick = async (leadsTo: LeadsTo) => {
    if (leadsTo === LeadsTo.nextQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    }

    if (leadsTo === LeadsTo.teenExit) {
      const teenExitIpp = exitZones.ipp_teen[Math.floor(Math.random() * exitZones.ipp_teen.length)];
      const teenExitPopsIpp = exitZones.ipp_teen_pops;

      // const teenExitOnclick = exitZones.onclick_teen[Math.floor(Math.random() * exitZones.onclick_autoexit.length)];
      // const teenExitPopsOnclick = exitZones.onclick_teen_pops;

      const main = getExitLinkFromBackend(teenExitIpp);
      const pops = getExitLinkFromBackend(teenExitPopsIpp);
      const [mainUrl, popsUrl] = await Promise.all([main, pops]);

      if (production) {
        setCookie('nonUniqueTeen', '1', { expires: 7, path: '' });
      }
      initBack(exitZones.onclick_back_zone);
      window.open(mainUrl, '_blank');
      window.location.replace(popsUrl);
    }

    if (leadsTo === LeadsTo.thankYouPage) {
      if (typeof window !== 'undefined') {
        const params = window.location.search;
        window.location.href = `/assessment${params}`;
      }
    }
  };

  return (
    <>
      <h1 className={'text-center text-2xl font-bold'}>{filteredQuestion.question}</h1>
      <div className={'grid w-full grid-cols-1 gap-2 sm:grid-cols-2'}>
        {filteredQuestion.answers.map((answer) => (
          <button
            type={'button'}
            onClick={() => handleButtonClick(answer.to)}
            key={answer.id}
            className={'w-full cursor-pointer rounded bg-yellow-500 px-5 py-1 text-center text-black'}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </>
  );
};

export default Survey;
