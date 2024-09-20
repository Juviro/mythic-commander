import { useEffect, useState } from 'react';
import { XYCoord } from 'react-dnd';
import { DropCard } from 'types/dnd.types';
import { ZONES } from 'backend/database/gamestate.types';
import useGameActions from '../../useGameActions';

const useStack = () => {
  const { toggleStackOverlay, onMoveCard } = useGameActions();
  const [initialPosition, setInitialPosition] = useState<XYCoord | null>(null);

  useEffect(() => {
    setInitialPosition({
      x: window.innerWidth / 2 - 200,
      y: window.innerHeight / 2 - 200,
    });
  }, []);

  const onClose = () => {
    toggleStackOverlay({ visible: false });
  };

  const onDropCard = (card: DropCard, index: number) => {
    onMoveCard(card.clashId, ZONES.STACK, null, {
      index,
    });
  };

  return {
    initialPosition,
    setInitialPosition,
    onDropCard,
    onClose,
  };
};

export default useStack;
