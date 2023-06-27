import { useState } from 'preact/hooks';

interface ISurveyProps {}

const data = [
  {
    id: 1,
    question: 'What is your gender?',
    answers: [
      {
        id: 1,
        text: 'Man',
      },
      {
        id: 2,
        text: 'Woman',
      },
    ],
  },
  {
    id: 2,
    question: 'What is your gender?',
    answers: [
      {
        id: 1,
        text: 'Male',
      },
      {
        id: 2,
        text: 'Female',
      },
    ],
  },
  {
    id: 3,
    question: 'What is your gender?',
    answers: [
      {
        id: 1,
        text: 'M',
      },
      {
        id: 2,
        text: 'F',
      },
    ],
  },
];

const Survey = ({}: ISurveyProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
//   console.log('🚀 ~ currentQuestion:', currentQuestion);
  const filteredQuestion = data.filter((question) => question.id === currentQuestion)[0];
  const incrementCurrentQuestion = () => {
    if (currentQuestion < data.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-2 p-10 max-w-md ml-auto mr-auto'>
      <h3 className={'text-2xl font-bold'}>{filteredQuestion.question}</h3>
      {filteredQuestion.answers.map((answer) => (
        <p
          onClick={incrementCurrentQuestion}
          key={answer.id}
          className={'w-full cursor-pointer rounded bg-yellow-500 px-5 py-1 text-center text-black'}
        >
          {answer.text}
        </p>
      ))}
    </div>
  );
};

export default Survey;
