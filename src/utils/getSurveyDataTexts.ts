import type { TSurveyTexts } from 'src/i18n/2025/en';

import type { TValidOffer } from '@config/globalConfig';

export enum LeadsTo {
  beginSurvey = 'beginSurvey',
  nextQuestion = 'nextQuestion',
  teenExit = 'teenExit',
  thankYouPage = 'thankYouPage',
  toAssessment = 'toAssessment',
  mainExit = 'mainExit',
}

export const getSurveyDataTexts = (texts: TSurveyTexts, offerId: TValidOffer) => {
  const length = texts.length;

  return texts.map((text, index) => {
    const objectNumber = index + 1;

    return {
      id: objectNumber,
      question: text.q,
      answers: text.a.map((answer, index) => {
        const to =
          objectNumber === 2 && index === 0
            ? LeadsTo.teenExit
            : objectNumber === length && offerId === 0
            ? LeadsTo.toAssessment
            : objectNumber === length && offerId === 10864
            ? LeadsTo.thankYouPage
            : LeadsTo.nextQuestion;
        return {
          id: index + 1,
          text: answer,
          to: to,
        };
      }),
    };
  });
};

export type TSurveyDataSchema = ReturnType<typeof getSurveyDataTexts>;
