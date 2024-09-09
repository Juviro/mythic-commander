import { useContext, useEffect, useState } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import useSettings from '../GameInfo/GuideModal/Settings/useSettings';

const useAutoUntapLands = () => {
  const { gameState, player } = useContext(GameStateContext);
  const [settings] = useSettings();

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
