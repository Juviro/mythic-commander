import React from 'react';

import { GameStateContextProvider } from './GameStateContext';
import GameField from './GameField/GameField';

const Game = () => {
  return (
    <GameStateContextProvider>
      <GameField />
    </GameStateContextProvider>
  );
};

export default Game;
