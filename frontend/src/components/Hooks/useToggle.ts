import { useState } from 'react';

export default (initialValue?: boolean): [boolean, (val?: any) => void] => {
  const [isTrue, setIsTrue] = useState<boolean>(initialValue || false);

  const onToggle = (val?: any) => {
    const newValue = typeof val === 'boolean' ? val : !isTrue;
    setIsTrue(newValue);
  };

  return [isTrue, onToggle];
};
