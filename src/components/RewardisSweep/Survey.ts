export interface ISurvey extends IQuestion {
  answers: IAnswer[];
}
export interface IQuestion {
  question: string;
  id: number | string;
}

type TActions = {
  [key in EAnswerActions]?: boolean | null;
};

export interface IAnswer {
  id: number | string;
  text: string;
  actions: TActions | null;
  audienceId: number[] | null;
}
enum EAnswerActions {
  toTeenExit = 'toTeenExit',
}

export const rewardisSurvey: ISurvey[] = [
  {
    id: 1,
    question: 'What is your gender?',
    answers: [
      {
        id: 1,
        text: 'Man',
        actions: null,
        audienceId: [61427, 60623],
      },
      {
        id: 2,
        text: 'Woman',
        actions: null,
        audienceId: [61428, 60624],
      },
    ],
  },
  {
    id: 2,
    question: 'How old are you?',
    answers: [
      {
        id: 1,
        text: 'under 18',
        audienceId: [61421, 62387, 60625],
        actions: {
          toTeenExit: true,
        },
      },
      {
        id: 2,
        text: '18-29 years',
        audienceId: [62180, 62377, 68427, 78100, 62377, 62382, 68423, 78096],
        actions: null,
      },
      {
        id: 3,
        text: '30-49 years',
        actions: null,
        audienceId: [62181, 62380, 68425, 78097, 62383, 78101],
      },
      {
        id: 4,
        text: '50-80 years',
        actions: null,
        audienceId: [62182, 62381, 68426, 78098, 62384, 78102],
      },
    ],
  },
  {
    id: 3,
    question: 'How many people live with you in the household?',
    answers: [
      {
        id: 1,
        text: 'one',
        actions: null,
        audienceId: null,
      },
      {
        id: 2,
        text: 'two',
        actions: null,
        audienceId: null,
      },
      {
        id: 3,
        text: 'three',
        actions: null,
        audienceId: null,
      },
      {
        id: 4,
        text: 'four',
        actions: null,
        audienceId: null,
      },
    ],
  },
  {
    id: 4,
    question: 'Have you ever used this device?',
    answers: [
      {
        id: 1,
        text: 'yes',
        actions: null,
        audienceId: null,
      },
      {
        id: 2,
        text: 'no',
        actions: null,
        audienceId: null,
      },
    ],
  },
];
