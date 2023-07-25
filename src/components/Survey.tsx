import exitZones from '@config/2025';
import { getExitLinkFromBackend } from '@utils/getExitLinkFromBackend';
import production from '@utils/isProduction';
import { initBack } from './Monetization/Back';
import { useState } from 'preact/hooks';
import type { TSurveyTexts } from '@i18n/2025/en';
import { getRandomZone } from '@utils/getRandomZone';
import { LeadsTo, getSurveyDataTexts } from '@src/utils/getSurveyDataTexts';
import { setCookie } from 'typescript-cookie';

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
      const [mainUrl, popsUrl] = await Promise.all([main, pops]);

      if (production) {
        setCookie('nonUniqueTeen', 'true', { expires: 7, path: '' });
        initBack(exitZones.onclick_back_zone);
        window.open(mainUrl, '_blank');
        window.location.replace(popsUrl);
      } else {
        console.log('teen exit');
        console.log(`mainUrl = `, mainUrl);
        console.log(`popsUrl = `, popsUrl);
      }
    }

    if (leadsTo === LeadsTo.thankYouPage) {
      // setAssessment(true);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        if (url.pathname === '/') {
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
