import type { TSurveyTexts } from 'src/i18n/2025/en';

export enum LeadsTo {
  nextQuestion = 'nextQuestion',
  teenExit = 'teenExit',
  thankYouPage = 'thankYouPage',
}

export const getSurveyDataTexts = (texts: TSurveyTexts) => {
  const length = texts.length;

  return texts.map((text, index) => {
    const objectNumber = index + 1;

    return {
      id: objectNumber,
      question: text.q,
      answers: text.a.map((answer, index) => {
        const to =
          objectNumber === 2 && index === 0 ? LeadsTo.teenExit : objectNumber === length ? LeadsTo.thankYouPage : LeadsTo.nextQuestion;
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