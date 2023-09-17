import { useState } from 'preact/hooks';
import { setCookie } from 'typescript-cookie';

import exitZones from '@config/2025';

import type { TSurveyTexts } from '@i18n/2025/en';

import fetchAndOpenUrls from '@utils/fetchAndOpenUrls';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import { getRandomZone } from '@utils/getRandomZone';
import { LeadsTo, getSurveyDataTexts } from '@utils/getSurveyDataTexts';
import production from '@utils/isProduction';

import { initBack } from './Monetization/Back';

interface ISurveyProps {
  texts: TSurveyTexts;
}

const Survey = ({ texts }: ISurveyProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const surveyData = getSurveyDataTexts(texts);
  const filteredQuestion = surveyData.filter((question) => question.id === currentQuestion)[0];

  const handleButtonClick = async (leadsTo: LeadsTo) => {
    if (leadsTo === LeadsTo.nextQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    }

    if (leadsTo === LeadsTo.teenExit) {
      const teenExitIpp = getRandomZone(exitZones.ipp_teen);
      const teenExitPopsIpp = exitZones.ipp_teen_pops;

      const main = getExitLinkFromBackend(teenExitIpp);
      const pops = getExitLinkFromBackend(teenExitPopsIpp);

      if (production) {
        setCookie('nonUniqueTeen', 'true', { expires: 7, path: '' });
        initBack(exitZones.onclick_back_zone);
        await fetchAndOpenUrls([main, pops]);
      } else {
        console.log('teen exit');
      }
    }

    if (leadsTo === LeadsTo.thankYouPage) {
      // setAssessment(true);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (url.pathname.endsWith('/')) {
          url.pathname += 'assessment';
        } else {
          url.pathname += '/assessment';
        }
        window.location.href = url.href;
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
