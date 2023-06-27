import { useState } from 'preact/hooks';
interface ICounterProps {}

const Counter = ({}: ICounterProps) => {
  const [count, setCount] = useState(0);
  console.log('🚀 ~ count:', count);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className={'flex flex-row items-center justify-center gap-4'}>
        <button className='p-2 bg-slate-200' onClick={increment}>
          +
        </button>
        <button className='p-2 bg-slate-200' onClick={decrement}>
          -
        </button>
        <button className='p-2 bg-slate-200' onClick={reset}>
          Reset
        </button>
      </div>
      <h1>{count}</h1>
    </div>
  );
};

export default Counter;
