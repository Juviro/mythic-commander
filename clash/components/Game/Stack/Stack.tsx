import React, { useContext } from 'react';

import LibraryExplorerCardList from 'components/GameComponents/LibraryExplorer/LibraryExplorerCardList';
import { ZONES } from 'backend/database/gamestate.types';
import { DndItemTypes } from 'types/dnd.types';
import DraggableModal from '../DraggableModal/DraggableModal';
import useStack from './useStack';
import GameStateContext from '../GameStateContext';

const Stack = () => {
  const { isInitialized, gameState } = useContext(GameStateContext);
  const { initialPosition, setInitialPosition, onClose, onDropCard } = useStack();

  if (!initialPosition || !isInitialized || !gameState.stack?.visible) return null;

  return (
    <DraggableModal
      onMove={setInitialPosition}
      initialPosition={initialPosition}
      title="Stack"
      noCloseTooltip={
        gameState.stack.cards.length > 0
          ? 'You cannot close the stack while there are cards on it'
          : undefined
      }
      onClose={onClose}
    >
      <LibraryExplorerCardList
        stackVertically
        zone={ZONES.STACK}
        cards={gameState.stack.cards}
        onDrop={onDropCard}
        cardDropType={DndItemTypes.CARD}
        empty="Drag Cards here to put them onto the Stack"
      />
    </DraggableModal>
  );
};

export default Stack;
