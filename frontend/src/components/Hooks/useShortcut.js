import { useEffect } from 'react';
import keyCodes from '../../constants/keyCodes';

export const isInputField = event => {
  return ['TEXTAREA', 'INPUT'].includes(event.target.nodeName);
};

export const isModifierKey = event => {
  const { altKey, ctrlKey, metaKey, shiftKey } = event;
  return altKey || ctrlKey || metaKey || shiftKey;
};

export default (triggerKey, action) => {
  const onKeyDown = event => {
    if (isInputField(event) || isModifierKey(event)) return;
    if (event.key === triggerKey || event.keyCode === keyCodes[triggerKey]) {
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
