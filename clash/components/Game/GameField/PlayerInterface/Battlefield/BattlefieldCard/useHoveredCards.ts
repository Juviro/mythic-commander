import { useContext } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import useSettings from 'components/Game/Menu/GameInfo/GuideModal/Settings/useSettings';
import { Card } from 'backend/database/gamestate.types';

const useHoveredCards = (card: Card) => {
  const { gameState, player: self } = useContext(GameStateContext);
  const [settings] = useSettings();

  const getHoveringCard = () => {
    if (!settings.showEnemyHovering) return {};
    if (!gameState?.hoveredCards) return {};

    const hoverEntry = Object.entries(gameState.hoveredCards)
      .filter(([playerId]) => playerId !== self.id)
      .find(([_, hoveredCard]) => hoveredCard.clashId === card.clashId);

    return {
      hoveringCard: hoverEntry?.[1],
      hoveringPlayer: hoverEntry?.[0],
    };
  };

  const { hoveringCard, hoveringPlayer } = getHoveringCard();

  return {
    hoveringCard,
    hoveringPlayer,
  };
};

export default useHoveredCards;
