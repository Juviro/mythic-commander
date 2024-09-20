import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClient, QueryClientProvider } from 'react-query';

import { GameStateContextProvider } from './GameStateContext';
import GameField from './GameField/GameField';
import { CardPositionContextProvider } from './CardPositionContext';

import GameDocumentTitle from './GameDocumentTitle/GameDocumentTitle';
import GameOverlays from './GameOverlays/GameOverlays';

const queryClient = new QueryClient();

const Game = () => {
  return (
    <GameStateContextProvider>
      <CardPositionContextProvider>
        <QueryClientProvider client={queryClient}>
          <DndProvider backend={HTML5Backend}>
            <GameField />
            <GameDocumentTitle />
            <GameOverlays />
          </DndProvider>
        </QueryClientProvider>
      </CardPositionContextProvider>
    </GameStateContextProvider>
  );
};

export default Game;
