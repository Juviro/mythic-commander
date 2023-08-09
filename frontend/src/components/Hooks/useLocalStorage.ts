import { useState } from 'react';

const useLocalStorage = <S>(key: string, initialValue: S): [S, (newValue: S) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);

    try {
      const value = JSON.parse(item);

      if (value === null) return initialValue;

      return value;
    } catch {
      return item;
    }
  });

  const setValue = (value: S) => {
    if (value === null || value === undefined) {
      window.localStorage.setItem(key, '');
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }

    setStoredValue(value);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
