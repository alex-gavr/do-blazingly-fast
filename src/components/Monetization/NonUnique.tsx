import { useEffect } from 'preact/hooks';
import { getCookie } from 'typescript-cookie';

interface INonUniqueProps {
  nonUniqueUrl?: string;
  nonUniqueTeenUrl?: string;
}

const NonUnique = ({ nonUniqueUrl, nonUniqueTeenUrl }: INonUniqueProps) => {
  const nonUnique = getCookie('nonUnique') ?? false;
  const nonUniqueAutoExit = getCookie('autoExit') ?? false;
  const nonUniqueTeen = getCookie('nonUniqueTeen') ?? false;

  useEffect(() => {
    if (!nonUnique && !nonUniqueAutoExit && !nonUniqueTeen) {
      return;
    } else {
      if (nonUnique || nonUniqueAutoExit) {
        // TODO: FETCH URLS
        if (nonUniqueUrl) {
          window.open(nonUniqueUrl, '_blank');
          window.location.replace(nonUniqueUrl);
        }
      } else if (nonUniqueTeen && nonUniqueTeenUrl) {
        window.open(nonUniqueTeenUrl, '_blank');
        window.location.replace(nonUniqueTeenUrl);
      }
    }
  }, [nonUnique, nonUniqueAutoExit, nonUniqueTeen]);

  return null;
};

export default NonUnique;
