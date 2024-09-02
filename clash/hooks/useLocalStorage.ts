import { useEffect, useState } from 'react';

const CHANGE_EVENT_NAME = 'localStorageChange';

const useLocalStorage = <S>(
  key: string,
  initialValue?: S
): [S, (newValue: S) => void] => {
  const getDataFromStore = () => {
    const item = window.localStorage.getItem(key);

    try {
      const value = JSON.parse(item ?? '');

      if (value === null) return initialValue;

      return value;
    } catch {
      return item ?? initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getDataFromStore);

  const setValue = (value: S) => {
    if (value === null || value === undefined) {
      window.localStorage.setItem(key, '');
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }

    setStoredValue(value);
    const event = new CustomEvent(CHANGE_EVENT_NAME);
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const onChangeEvent = () => {
      setStoredValue(getDataFromStore());
    };

    window.addEventListener(CHANGE_EVENT_NAME, onChangeEvent);

    return () => {
      window.removeEventListener(CHANGE_EVENT_NAME, onChangeEvent);
    };
  }, []);

  return [storedValue, setValue];
};

export default useLocalStorage;
