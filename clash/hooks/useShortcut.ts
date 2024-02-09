import { RefObject, useEffect, useState } from 'react';

export const isInputField = (event: any) => {
  const { nodeName, type } = event.target;
  const ignoredInputTypes = ['checkbox', 'radio'];

  if (nodeName === 'TEXTAREA') return true;
  if (nodeName === 'INPUT' && !ignoredInputTypes.includes(type)) return true;

  return false;
};

export const getModifierKeys = (event: KeyboardEvent) => {
  return ['alt', 'control', 'meta', 'shift'].filter((key) => {
    const eventKey = `${key}Key` as 'altKey' | 'ctrlKey' | 'metaKey' | 'shiftKey';
    return event[eventKey];
  });
};

type ModifierKey = 'alt' | 'control' | 'meta' | 'shift';

interface Options {
  disabled?: boolean;
  whenHovering?: RefObject<HTMLElement>;
  modifierKeys?: ModifierKey[];
}

const useShortcut = (
  keys: string | string[],
  action: () => void,
  options: Options = {}
) => {
  const keysArray = Array.isArray(keys) ? keys : [keys];
  const { disabled = false, whenHovering, modifierKeys = [] } = options;

  const [isHovering, setIsHovering] = useState(false);

  const onKeyDown = (event: KeyboardEvent) => {
    if (disabled || !action || isInputField(event)) {
      return;
    }
    const eventModifierKeys = getModifierKeys(event);

    if (eventModifierKeys.length !== modifierKeys.length) return;
    if (
      modifierKeys.some(
        (modifierKey) => !eventModifierKeys.includes(modifierKey as ModifierKey)
      )
    ) {
      return;
    }

    if (whenHovering?.current && !isHovering) return;

    if (!keysArray.some((key) => key.toLowerCase() === event.key.toLowerCase())) return;

    event.preventDefault();
    event.stopPropagation();
    action();
  };

  useEffect(() => {
    if (disabled) return undefined;
    document.addEventListener('keydown', onKeyDown, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
  }, [keysArray.join(','), action, disabled]);

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
