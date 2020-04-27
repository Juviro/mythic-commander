import { useQueryParam } from 'use-query-params';
import { useEffect } from 'react';

import useLocalStorage from './useLocalStorage';

const initialValues = {
  zoom: 100,
  pageSize: 10,
  layout: 'list',
  orderBy: 'name-asc',
};

export default (key, paramType) => {
  if (!key || !paramType || !initialValues[key]) {
    throw new Error('param or initial value missing');
  }

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
    // console.log('replacing', key, value, storedValue);
    if (value) return;
    setValue(storedValue, 'replaceIn');
    // eslint-disable-next-line
  }, [value, storedValue]);

  return [value, setValue];
};
