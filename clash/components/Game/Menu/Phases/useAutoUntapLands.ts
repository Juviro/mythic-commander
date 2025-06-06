import { useContext, useEffect, useRef, useState } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import useSettings from '../GameInfo/GuideModal/Settings/useSettings';

const useAutoUntapLands = () => {
  const previousTurn = useRef(0);
  const { gameState, player } = useContext(GameStateContext);
  const [settings] = useSettings();

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { onTapCards } = useGameActions();

  const { activePlayerId, turn, players } = gameState!;

  const untapCards = () => {
    if (!settings?.autoUntapLands) return;
    // Prevent untap when going back / undoing
    if (previousTurn.current >= turn) return;
    previousTurn.current = turn;

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

    untapCards();
  }, [activePlayerId]);

  // If there is only one player, untap on turn change instead of active player change
  useEffect(() => {
    if (isInitialLoad) {
      return;
    }

    if (players.length > 1) return;

    untapCards();
  }, [turn]);
};

export default useAutoUntapLands;
