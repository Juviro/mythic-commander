import { useEffect } from 'react';

export const isInputField = (event: any) => {
  const { nodeName, type } = event.target;
  const ignoredInputTypes = ['checkbox', 'radio'];

  if (nodeName === 'TEXTAREA') return true;
  if (nodeName === 'INPUT' && !ignoredInputTypes.includes(type)) return true;

  return false;
};

export const isModifierKey = (event: KeyboardEvent) => {
  const { altKey, ctrlKey, metaKey, shiftKey } = event;
  return altKey || ctrlKey || metaKey || shiftKey;
};

interface Options {
  disabled?: boolean;
}

const useShortcut = (key: string, action: () => void, options: Options = {}) => {
  const { disabled = false } = options;

  const onKeyDown = (event: KeyboardEvent) => {
    if (disabled || !action || isInputField(event) || isModifierKey(event)) {
      return;
    }

    if (event.key === key) {
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

export default useShortcut;
