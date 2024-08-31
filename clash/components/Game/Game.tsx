import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClient, QueryClientProvider } from 'react-query';

import { GameStateContextProvider } from './GameStateContext';
import GameField from './GameField/GameField';
import { CardPositionContextProvider } from './CardPositionContext';
import ScreenMessage from './ScreenMessage/ScreenMessage';
import Fireworks from './ScreenMessage/Fireworks';
import CardRules from './CardRules/CardRules';

const queryClient = new QueryClient();

const Game = () => {
  return (
    <GameStateContextProvider>
      <CardPositionContextProvider>
        <QueryClientProvider client={queryClient}>
          <DndProvider backend={HTML5Backend}>
            <GameField />
            <CardRules />
            <ScreenMessage />
            <Fireworks />
          </DndProvider>
        </QueryClientProvider>
      </CardPositionContextProvider>
    </GameStateContextProvider>
  );
};

export default Game;
