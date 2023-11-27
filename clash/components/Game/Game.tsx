import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { GameStateContextProvider } from './GameStateContext';
import GameField from './GameField/GameField';
import { CardPositionContextProvider } from './CardPositionContext';

const Game = () => {
  return (
    <GameStateContextProvider>
      <CardPositionContextProvider>
        <DndProvider backend={HTML5Backend}>
          <GameField />
        </DndProvider>
      </CardPositionContextProvider>
    </GameStateContextProvider>
  );
};

export default Game;
