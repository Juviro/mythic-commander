import { useEffect } from 'react';
import { useQueryParam, BooleanParam } from 'use-query-params';

export default () => {
  const [, setBlock] = useQueryParam('blockShortcuts', BooleanParam);

  useEffect(() => {
    setBlock(true);
    return () => setBlock(undefined);
    // eslint-disable-next-line
  }, []);

  return null;
};
