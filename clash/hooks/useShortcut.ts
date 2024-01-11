import { RefObject, useEffect, useState } from 'react';

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
  whenHovering?: RefObject<HTMLElement>;
}

const useShortcut = (key: string, action: () => void, options: Options = {}) => {
  const { disabled = false, whenHovering } = options;

  const [isHovering, setIsHovering] = useState(false);

  const onKeyDown = (event: KeyboardEvent) => {
    if (disabled || !action || isInputField(event) || isModifierKey(event)) {
      return;
    }

    if (whenHovering?.current && !isHovering) return;

    if (event.key === key) {
      event.preventDefault();
      event.stopPropagation();
      action();
    }
  };

  useEffect(() => {
    if (disabled) return undefined;
    document.addEventListener('keydown', onKeyDown, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
  }, [key, action, disabled]);

  useEffect(() => {
    if (!whenHovering?.current || disabled) {
      setIsHovering(false);
      return undefined;
    }

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    whenHovering.current.addEventListener('mouseenter', onMouseEnter);
    whenHovering.current.addEventListener('mouseleave', onMouseLeave);

    return () => {
      whenHovering.current?.removeEventListener('mouseenter', onMouseEnter);
      whenHovering.current?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [whenHovering?.current, setIsHovering, disabled]);
};

export default useShortcut;
