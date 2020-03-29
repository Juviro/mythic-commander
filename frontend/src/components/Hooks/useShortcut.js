import { useEffect } from 'react';

const keyMap = {
  e: 69,
  ESCAPE: 27,
};

export default (triggerKey, action) => {
  const onKeyDown = event => {
    if (event.target.nodeName === 'INPUT') return;
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
