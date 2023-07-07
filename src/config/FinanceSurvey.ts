export enum LeadsTo {
    nextQuestion = 'nextQuestion',
    teenExit = 'teenExit',
    thankYouPage = 'thankYouPage',
  }

export const financeSurveyData = [
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