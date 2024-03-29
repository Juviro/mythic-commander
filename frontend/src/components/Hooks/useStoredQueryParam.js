import { useQueryParam } from 'use-query-params';
import { useEffect } from 'react';

import useLocalStorage from './useLocalStorage';

const initialValues = {
  zoom: 100,
  pageSize: 10,
  layout: 'grid',
  orderBy: 'name-asc',
  orderByAdvanced: 'added-desc',
};

export default (key, paramType) => {
  if (!key || !paramType || !initialValues[key]) {
    throw new Error('param or initial value missing');
  }

  const [storedValue, setStoredValue] = useLocalStorage(key, initialValues[key]);
  const [value, setValue] = useQueryParam(key, paramType);

  useEffect(() => {
    if (value === undefined) return;
    setStoredValue(value);
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    if (value) return;
    setValue(storedValue);
  });

  return [value, setValue];
};
