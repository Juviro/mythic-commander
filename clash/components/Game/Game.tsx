import React from 'react';

import { GameStateContextProvider } from './GameStateContext';

const Game = () => {
  return (
    <GameStateContextProvider>
      <div>Game</div>
    </GameStateContextProvider>
  );
};

export default Game;
