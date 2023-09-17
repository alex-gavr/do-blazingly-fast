import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';

type TJustLog = {
  somethingToLog: unknown;
  type: 'error' | 'info' | 'log' | 'warn';
};

const justLog = ({ somethingToLog, type }: TJustLog) => {
  if (!production || debug) {
    if (type === 'log') {
      console.log(somethingToLog);
    }
    if (type === 'info') {
      console.info(somethingToLog);
    }
    if (type === 'warn') {
      console.warn(somethingToLog);
    }
  }
  if (type === 'error') {
    console.error(somethingToLog);
  }
};

export default justLog;
