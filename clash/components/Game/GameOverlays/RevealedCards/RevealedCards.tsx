import React, { useContext } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import RevealedCardsModal from './RevealedCardsModal';

const RevealedCards = () => {
  const { gameState, player: self, isInitialized } = useContext(GameStateContext);

  if (!isInitialized) return null;

  return (
    <>
      {gameState.players.map((player) => (
        <RevealedCardsModal
          key={player.id}
          player={player}
          isSelf={player.id === self.id}
        />
      ))}
    </>
  );
};
export default RevealedCards;
