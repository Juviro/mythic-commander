import { useContext, useEffect } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import useLocalStorage from 'hooks/useLocalStorage';
import useGameActions from 'components/Game/useGameActions';
import Settings, { SETTINGS_STORAGE_KEY } from '../GameInfo/GuideModal/Settings';

const useAutoUntapLands = () => {
  const { gameState, player } = useContext(GameStateContext);
  const [settings] = useLocalStorage<Settings>(SETTINGS_STORAGE_KEY);

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
