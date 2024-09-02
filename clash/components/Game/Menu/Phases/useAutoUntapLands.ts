import { useContext, useEffect } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import useLocalStorage from 'hooks/useLocalStorage';
import useGameActions from 'components/Game/useGameActions';
import {
  DEFAULT_SETTINGS,
  Settings,
  SETTINGS_STORAGE_KEY,
} from 'components/Game/InitSettings/InitSettings';

const useAutoUntapLands = () => {
  const { gameState, player } = useContext(GameStateContext);
  const [settings] = useLocalStorage<Settings>(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);

  const { onTapCards } = useGameActions();

  const { activePlayerId } = gameState!;

  useEffect(() => {
    if (activePlayerId !== player?.id) return;
    if (!settings?.autoUntap) return;

    onTapCards({
      battlefieldPlayerId: player.id,
      tapped: false,
      type: 'Land',
    });
  }, [activePlayerId]);
};

export default useAutoUntapLands;
