import { useContext, useEffect, useState } from 'react';

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

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { onTapCards } = useGameActions();

  const { activePlayerId, turn, players } = gameState!;

  const untapCards = () => {
    const untapType = settings.autoUntapAll ? 'All' : 'Land';

    onTapCards({
      battlefieldPlayerId: player!.id,
      tapped: false,
      type: untapType,
    });
  };

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    if (activePlayerId !== player?.id) return;
    if (!settings?.autoUntapLands) return;
    untapCards();
  }, [activePlayerId]);

  // If there is only one player, untap un turn change instead of active player change
  useEffect(() => {
    if (isInitialLoad) {
      return;
    }

    if (players.length > 1) return;
    if (!settings?.autoUntapLands) return;

    untapCards();
  }, [turn]);
};

export default useAutoUntapLands;
