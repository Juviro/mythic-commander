import Settings, {
  SETTINGS_STORAGE_KEY,
} from 'components/Game/Menu/GameInfo/GuideModal/Settings';
import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

const useIsGridDisabled = () => {
  const [isKeyPressed, setIsKeyPressed] = useState(true);
  const [settings] = useLocalStorage<Settings>(SETTINGS_STORAGE_KEY);

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
