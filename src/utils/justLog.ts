import debug from '@utils/simpleFunctions/isDebug';
import production from '@utils/simpleFunctions/isProduction';

type TJustLog = {
  text: string;
  type: 'error' | 'info' | 'log' | 'warn';
};

const justLog = ({ text, type }: TJustLog) => {
  if (!production && debug) {
    if (type === 'log') {
      console.log(text);
    }
    if (type === 'info') {
      console.info(text);
    }
    if (type === 'warn') {
      console.warn(text);
    }
  }
  if (type === 'error') {
    console.error(text);
  }
};

export default justLog;
