import { useState } from 'react';

export default (key, initialValue) => {
  const fullKey = `storedParam-${key}`;
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(fullKey);
    try {
      const value = JSON.parse(item);
      if (value === null) return initialValue;
      return value;
    } catch {
      return item || initialValue;
    }
  });

  const setValue = value => {
    window.localStorage.setItem(fullKey, value);
    setStoredValue(value);
  };

  return [storedValue, setValue];
};
