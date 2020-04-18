import { useQueryParam } from 'use-query-params';
import { useEffect } from 'react';

import useLocalStorage from './useLocalStorage';

const initialValues = {
  zoom: 100,
  pageSize: 10,
  layout: 'list',
};

export default (key, paramType) => {
  if (!key || !paramType || !initialValues[key]) throw new Error();
  const [storedValue, setStoredValue] = useLocalStorage(
    key,
    initialValues[key]
  );
  const [value, setValue] = useQueryParam(key, paramType);

  useEffect(() => {
    if (value === undefined) return;
    setStoredValue(value);
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    if (value) return;
    setValue(storedValue);
    // eslint-disable-next-line
  }, [value, storedValue]);

  return [value, setValue];
};
