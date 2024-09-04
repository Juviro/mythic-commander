import { useEffect, useState } from 'react';
import {
  DEFAULT_SETTINGS,
  Settings,
  SETTINGS_STORAGE_KEY,
} from 'components/Game/InitSettings/InitSettings';
import useLocalStorage from 'hooks/useLocalStorage';

const useIsGridDisabled = () => {
  const [isKeyPressed, setIsKeyPressed] = useState(true);
  const [settings] = useLocalStorage<Settings>(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);

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

  return isKeyPressed || !settings.useGrid;
};

export default useIsGridDisabled;
