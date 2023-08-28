import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { GameStateContextProvider } from './GameStateContext';
import GameField from './GameField/GameField';

const Game = () => {
  return (
    <GameStateContextProvider>
      <DndProvider backend={HTML5Backend}>
        <GameField />
      </DndProvider>
    </GameStateContextProvider>
  );
};

export default Game;
