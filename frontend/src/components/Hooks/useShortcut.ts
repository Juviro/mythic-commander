import { useEffect, useContext } from 'react';
import keyCodes from '../../constants/keyCodes';
import FocusContext from '../Provider/FocusProvider/FocusProvider';

export const isInputField = (event) => {
  const { nodeName, type } = event.target;
  const ignoredInputTypes = ['checkbox', 'radio'];

  if (nodeName === 'TEXTAREA') return true;
  if (nodeName === 'INPUT' && !ignoredInputTypes.includes(type)) return true;

  return false;
};

export const isModifierKey = (event) => {
  const { altKey, ctrlKey, metaKey, shiftKey } = event;
  return altKey || ctrlKey || metaKey || shiftKey;
};

interface Options {
  focusId?: string;
  disabled?: boolean;
}

export default (triggerKey: string, action: () => void, options?: Options) => {
  const { focusId = null, disabled = false } = options ?? {};
  const { focusedElement } = useContext(FocusContext);
  const focusIds = typeof focusId === 'string' ? [focusId] : focusId;

  const onKeyDown = (event: KeyboardEvent) => {
    if (disabled) return;
    const shouldBlock =
      focusedElement && (!focusIds || !focusIds.includes(focusedElement));
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
