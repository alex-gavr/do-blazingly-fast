import { useEffect, useState } from 'preact/hooks';
import Survey from './Survey';
import Assessment from './Assessment';
import Offer from './Offer';

interface IMainProps {}

const Main = ({}: IMainProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [assessment, setAssessment] = useState<boolean>(false);
  const [thankYou, setThankYou] = useState<boolean>(false);

  useEffect(() => {
    if (assessment) {
      const timer = setTimeout(() => {
        setThankYou(true);
        setAssessment(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [assessment]);

  return (
    <>
      {!assessment && !thankYou && (
        <Survey currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} setAssessment={setAssessment} />
      )}
      {assessment || thankYou ? (
        <div>
          {assessment && <Assessment />}
          {thankYou && <Offer />}
          <div className='rain' />
        </div>
      ) : null}
    </>
  );
};

export default Main;
