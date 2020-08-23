import { useState } from 'react';

export default (initialValue) => {
  const [isTrue, setIsTrue] = useState(initialValue || false);

  const onToggle = (val) => {
    const newValue = typeof val === 'boolean' ? val : !isTrue;
    setIsTrue(newValue);
  };

  return [isTrue, onToggle];
};
