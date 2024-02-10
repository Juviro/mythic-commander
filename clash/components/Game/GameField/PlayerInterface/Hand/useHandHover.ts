import { MouseEvent, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

import { Card, Player, ZONES } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';
import { DndItemTypes, DropCard } from 'types/dnd.types';

interface Props {
  hand: Card[];
  wrapperRef: React.RefObject<HTMLDivElement>;
  player: Player;
}

const useHandHover = ({ hand, wrapperRef, player }: Props) => {
  const [highlightedCardIndex, setHighlightedCardIndex] = useState(-1);
  const [isDragging, setIsDragging] = useState(false);

  const { onMoveCard } = useGameActions();

  const onDrop = ({ clashId }: DropCard) => {
    onMoveCard(clashId, ZONES.HAND, player.id, { index: highlightedCardIndex });
  };

  const [{ canDrop }, dropRef] = useDrop({
    accept: [DndItemTypes.CARD, DndItemTypes.LIST_CARD],
    drop: onDrop,
    collect: (monitor) => ({
      canDrop: !!monitor.canDrop(),
    }),
  });

  // store canDrop to fix a bug in chrome where updating canDrop
  // in the first render would cause the cards to the right would not be able
  // to be dragged because the z-index would flicker when starting to drag.
  useEffect(() => {
    setIsDragging(canDrop);
  }, [canDrop]);

  const getCardBounds = () => {
    const spacingElements = wrapperRef.current?.querySelectorAll('.spacing_element');
    const left = spacingElements?.[0]?.getBoundingClientRect().left ?? 0;
    const right =
      spacingElements?.[spacingElements.length - 1]?.getBoundingClientRect().right ?? 0;
    return { left, right };
  };

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const numberOfSegments = canDrop ? hand.length + 1 : hand.length;

    const { left, right } = getCardBounds();

    const wrapperWidth = right - left;

    const x = event.clientX - left;
    const currentSegment = Math.floor((x / wrapperWidth) * numberOfSegments);

    setHighlightedCardIndex(currentSegment);
  };

  const onDragOver = (event: MouseEvent<HTMLDivElement>) => {
    const numberOfSegments = canDrop ? hand.length + 1 : hand.length;
    const wrapperWidth = wrapperRef.current?.getBoundingClientRect().width ?? 0;
    const x = event.clientX - wrapperRef.current!.getBoundingClientRect().left;
    const currentSegment = Math.floor((x / wrapperWidth) * numberOfSegments);

    setHighlightedCardIndex(currentSegment);
  };

  return {
    highlightedCardIndex,
    onMouseMove,
    onDragOver,
    dropRef,
    canDrop,
    isDragging,
    setHighlightedCardIndex,
  };
};

export default useHandHover;
