import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { GameStateContextProvider } from './GameStateContext';
import GameField from './GameField/GameField';
import { CardPositionContextProvider } from './CardPositionContext';
import ScreenMessage from './ScreenMessage/ScreenMessage';
import Fireworks from './ScreenMessage/Fireworks';

const Game = () => {
  return (
    <GameStateContextProvider>
      <CardPositionContextProvider>
        <DndProvider backend={HTML5Backend}>
          <GameField />
          <ScreenMessage />
          <Fireworks />
        </DndProvider>
      </CardPositionContextProvider>
    </GameStateContextProvider>
  );
};

export default Game;
