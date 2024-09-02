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
import GameDocumentTitle from './GameDocumentTitle/GameDocumentTitle';
import InitSettings from './InitSettings/InitSettings';

const queryClient = new QueryClient();

const Game = () => {
  return (
    <GameStateContextProvider>
      <CardPositionContextProvider>
        <QueryClientProvider client={queryClient}>
          <DndProvider backend={HTML5Backend}>
            <InitSettings />
            <GameField />
            <CardRules />
            <ScreenMessage />
            <Fireworks />
            <GameDocumentTitle />
          </DndProvider>
        </QueryClientProvider>
      </CardPositionContextProvider>
    </GameStateContextProvider>
  );
};

export default Game;
