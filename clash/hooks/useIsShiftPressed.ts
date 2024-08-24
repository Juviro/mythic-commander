import { useEffect, useState } from 'react';

const useIsShiftPressed = () => {
  const [isKeyPressed, setIsKeyPressed] = useState(true);

  useEffect(() => {
    const onDrag = (event: DragEvent) => {
      const isShiftPressed = event.shiftKey;
      setIsKeyPressed(isShiftPressed);
    };
    const onDragEnd = () => {
      setIsKeyPressed(false);
    };

    document.addEventListener('drag', onDrag, false);
    document.addEventListener('dragend', onDragEnd, false);

    return () => {
      document.removeEventListener('drag', onDrag, false);
      document.removeEventListener('dragend', onDragEnd, false);
    };
  });

  return isKeyPressed;
};

export default useIsShiftPressed;
