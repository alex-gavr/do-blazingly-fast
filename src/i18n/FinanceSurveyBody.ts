export const financeSurveyBody = [
  {
    id: 1,
    question: 'What is your gender?',
    answers: [
      { id: 1, text: 'Man', to: 'nextQuestion' },
      { id: 2, text: 'Woman', to: 'nextQuestion' },
    ],
  },
  {
    id: 2,
    question: 'How old are you?',
    answers: [
      { id: 1, text: 'less than 18 years', to: 'teenExit' },
      { id: 2, text: '18-29 years', to: 'nextQuestion' },
      { id: 3, text: '30-49 years', to: 'nextQuestion' },
      { id: 4, text: '50-80 years', to: 'nextQuestion' },
    ],
  },
  {
    id: 3,
    question: 'How do you make a living?',
    answers: [
      { id: 1, text: 'I work', to: 'nextQuestion' },
      { id: 2, text: 'I am self-employed', to: 'nextQuestion' },
      { id: 3, text: 'I am unemployed', to: 'nextQuestion' },
      { id: 4, text: 'I am a pensioner', to: 'nextQuestion' },
    ],
  },
  {
    id: 4,
    question: 'What is your average income per year?',
    answers: [
      { id: 1, text: 'Less than $10,000', to: 'nextQuestion' },
      { id: 2, text: '$10,000-$30,000', to: 'nextQuestion' },
      { id: 3, text: '$30,000-$50,000', to: 'nextQuestion' },
      { id: 4, text: 'more than $50,000', to: 'nextQuestion' },
    ],
  },
  {
    id: 5,
    question: 'What is your financial goal for the next 5 years?',
    answers: [
      { id: 1, text: 'Go on a family holiday', to: 'nextQuestion' },
      { id: 2, text: 'Buy a supercar', to: 'nextQuestion' },
      { id: 3, text: 'Buy an apartment or a house', to: 'nextQuestion' },
      { id: 4, text: 'Start my own business', to: 'nextQuestion' },
    ],
  },
  {
    id: 6,
    question: 'How much would you invest right now to get closer to your financial goal much faster?',
    answers: [
      { id: 1, text: 'less than $250', to: 'nextQuestion' },
      { id: 2, text: '$250-$500', to: 'nextQuestion' },
      { id: 3, text: '$500-$1000', to: 'nextQuestion' },
      { id: 4, text: 'more than $1000', to: 'nextQuestion' },
    ],
  },
  {
    id: 7,
    question: 'Do you have any experience in Bitcoin trading?',
    answers: [
      { id: 1, text: 'No, I have never heard of it', to: 'toAssessment' },
      { id: 2, text: 'No, but I want to try', to: 'toAssessment' },
      { id: 3, text: 'Yes, I am a beginner', to: 'toAssessment' },
      { id: 4, text: 'Yes, I do it professionally', to: 'toAssessment' },
    ],
  },
];
