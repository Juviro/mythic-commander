import { useRef, useState } from 'react';

const isTouchEvent = event => {
  return 'touches' in event;
};

const preventDefault = event => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

const useLongPress = (
  onLongPress,
  onClick,
  { shouldPreventDefault = true, delay = 400 } = {}
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef();
  const target = useRef();
  const longPressRef = useRef();
  longPressRef.current = onLongPress;

  const start = event => {
    if (shouldPreventDefault && event.target) {
      event.target.addEventListener('touchend', preventDefault, {
        passive: false,
      });
      target.current = event.target;
    }
    timeout.current = setInterval(() => {
      longPressRef.current(event);
      setLongPressTriggered(true);
    }, delay);
  };

  const clear = (_, shouldTriggerClick = true) => {
    if (timeout.current) clearInterval(timeout.current);
    if (shouldTriggerClick && !longPressTriggered) onClick();
    setLongPressTriggered(false);
    if (shouldPreventDefault && target.current) {
      target.current.removeEventListener('touchend', preventDefault);
    }
  };

  return {
    onMouseDown: e => start(e),
    onTouchStart: e => start(e),
    onMouseUp: e => clear(e),
    onMouseLeave: e => clear(e, false),
    onTouchEnd: e => clear(e),
  };
};

export default useLongPress;
