import { useEffect } from 'react';
import { useQueryParam, BooleanParam } from 'use-query-params';
import keyCodes from '../../constants/keyCodes';

export const isInputField = event => {
  const { nodeName, type } = event.target;
  const ignoredInputTypes = ['checkbox', 'radio'];

  if (nodeName === 'TEXTAREA') return true;
  if (nodeName === 'INPUT' && !ignoredInputTypes.includes(type)) return true;

  return false;
};

export const isModifierKey = event => {
  const { altKey, ctrlKey, metaKey, shiftKey } = event;
  return altKey || ctrlKey || metaKey || shiftKey;
};

export default (triggerKey, action, ignoreBlock) => {
  const [isBlocked] = useQueryParam('blockShortcuts', BooleanParam);

  const onKeyDown = event => {
    const shouldBlock = !ignoreBlock && isBlocked;
    if (!action || isInputField(event) || isModifierKey(event) || shouldBlock) {
      return;
    }

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
