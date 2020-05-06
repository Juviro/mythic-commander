import { useEffect } from 'react';
import { useQueryParam, BooleanParam } from 'use-query-params';

export default (isVisible = true) => {
  const [, setBlock] = useQueryParam('blockShortcuts', BooleanParam);

  useEffect(() => {
    setBlock(isVisible || undefined);
    return () => setBlock(undefined);
    // eslint-disable-next-line
  }, [isVisible]);

  return null;
};
