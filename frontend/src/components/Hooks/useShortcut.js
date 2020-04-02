import { useEffect } from 'react';

const keyMap = {
  a: 65,
  e: 69,
  f: 70,
  s: 83,
  ESCAPE: 27,
};

export const isInputField = event => {
  return ['TEXTAREA', 'INPUT'].includes(event.target.nodeName);
};

export default (triggerKey, action) => {
  const onKeyDown = event => {
    if (isInputField(event)) return;
    if (event.keyCode === keyMap[triggerKey]) {
      event.preventDefault();
      event.stopPropagation();
      action();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);
    return () => document.removeEventListener('keydown', onKeyDown, false);
  });
};
