import type { TSurveyTexts } from "src/i18n/2025/en";

export enum LeadsTo {
  nextQuestion = 'nextQuestion',
  teenExit = 'teenExit',
  thankYouPage = 'thankYouPage',
}

export const financeSurveyData = (texts: TSurveyTexts) => {
  return [
    {
      id: 1,
      question: texts.q1,
      answers: [
        {
          id: 1,
          text: texts.a1[0],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 2,
          text: texts.a1[1],
          to: LeadsTo.nextQuestion,
        },
      ],
    },
    {
      id: 2,
      question: texts.q2,
      answers: [
        {
          id: 1,
          text: texts.a2[0],
          to: LeadsTo.teenExit,
        },
        {
          id: 2,
          text: texts.a2[1],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 3,
          text: texts.a2[2],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 4,
          text: texts.a2[3],
          to: LeadsTo.nextQuestion,
        },
      ],
    },
    {
      id: 3,
      question: texts.q3,
      answers: [
        {
          id: 1,
          text: texts.a3[0],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 2,
          text: texts.a3[1],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 3,
          text: texts.a3[2],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 4,
          text: texts.a3[3],
          to: LeadsTo.nextQuestion,
        },
      ],
    },
    {
      id: 4,
      question: texts.q4,
      answers: [
        {
          id: 1,
          text: texts.a4[0],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 2,
          text: texts.a4[1],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 3,
          text: texts.a4[2],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 4,
          text: texts.a4[3],
          to: LeadsTo.nextQuestion,
        },
      ],
    },
    {
      id: 5,
      question: texts.q5,
      answers: [
        {
          id: 1,
          text: texts.a5[0],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 2,
          text: texts.a5[1],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 3,
          text: texts.a5[2],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 4,
          text: texts.a5[3],
          to: LeadsTo.nextQuestion,
        },
      ],
    },
    {
      id: 6,
      question: texts.q6,
      answers: [
        {
          id: 1,
          text: texts.a6[0],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 2,
          text: texts.a6[1],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 3,
          text: texts.a6[2],
          to: LeadsTo.nextQuestion,
        },
        {
          id: 4,
          text: texts.a6[3],
          to: LeadsTo.nextQuestion,
        },
      ],
    },
    {
      id: 7,
      question: texts.q7,
      answers: [
        {
          id: 1,
          text: texts.a7[0],
          to: LeadsTo.thankYouPage,
        },
        {
          id: 2,
          text: texts.a7[1],
          to: LeadsTo.thankYouPage,
        },
        {
          id: 3,
          text: texts.a7[2],
          to: LeadsTo.thankYouPage,
        },
        {
          id: 4,
          text: texts.a7[3],
          to: LeadsTo.thankYouPage,
        },
      ],
    },
  ];
};
