import React, { ReactElement, useEffect, useRef } from 'react';

interface Props {
  children: ReactElement<any>;
  onLongPress: () => void;
  onPress: () => void;
}

const LongPress = ({ onLongPress, onPress, children }: Props) => {
  const timeout = useRef<number | null>(null);
  const isLongPress = useRef<boolean>(false);
  const longPressCallback = useRef<() => void>(() => {});

  longPressCallback.current = onLongPress;

  const onMouseDown = () => {
    timeout.current = window.setInterval(() => {
      longPressCallback.current?.();
      isLongPress.current = true;
    }, 500);
  };

  const onMouseUp = () => {
    if (!isLongPress.current) {
      onPress();
    }

    isLongPress.current = false;
    clearInterval(timeout.current!);
  };

  useEffect(() => {
    return () => {
      if (!timeout.current) return;
      clearTimeout(timeout.current);
    };
  }, []);

  return React.cloneElement(children as any, {
    onMouseDown,
    onMouseUp,
    onTouchStart: onMouseDown,
    onTouchEnd: onMouseUp,
  });
};

export default LongPress;
