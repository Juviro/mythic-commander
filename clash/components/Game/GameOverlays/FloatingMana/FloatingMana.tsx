import React, { useContext } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import FloatingManaModal from './FloatingManaModal';

const FloatingMana = () => {
  const { gameState, player: self, isInitialized } = useContext(GameStateContext);

  if (!isInitialized) return null;

  return (
    <>
      {gameState.players.map((player) => (
        <FloatingManaModal
          key={player.id}
          player={player}
          isSelf={player.id === self.id}
        />
      ))}
    </>
  );
};

export default FloatingMana;
