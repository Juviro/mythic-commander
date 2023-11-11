import { useLayoutEffect } from 'react';

import { Card } from 'backend/database/gamestate.types';

const storeCardPosition = (cardRef: React.RefObject<HTMLDivElement>, clashId: string) => {
  if (!cardRef.current) return;
  const { width, x, y } = cardRef.current.getBoundingClientRect();
  window.cardPostions[clashId] = {
    width,
    x,
    y,
  };
};

const animateCardPositionChange = (
  cardRef: React.RefObject<HTMLDivElement>,
  clashId: string
) => {
  if (!cardRef.current) return;
  const { width, x, y } = cardRef.current.getBoundingClientRect();

  // animate from old position to new position
  const deltaX = window.cardPostions[clashId]!.x - x;
  const deltaY = window.cardPostions[clashId]!.y - y;
  const deltaWidth = window.cardPostions[clashId]!.width / width;

  window.cardPostions[clashId] = null;

  cardRef.current.animate(
    [
      {
        transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaWidth})`,
      },
      {
        transform: 'translate(0px, 0px) scale(1)',
      },
    ],
    {
      duration: 500,
      easing: 'ease-in-out',
    }
  );
};

const useAnimateCardPositionChange = (
  card: Card,
  cardRef: React.RefObject<HTMLDivElement>
) => {
  const cardPosition = 'position' in card ? card.position : undefined;
  const { clashId } = card;

  useLayoutEffect(() => {
    if (window.cardPostions[clashId] && cardRef.current) {
      animateCardPositionChange(cardRef, clashId);
    }

    return () => {
      storeCardPosition(cardRef, clashId);
    };
  }, [JSON.stringify(cardPosition)]);

  useLayoutEffect(() => {
    if (!cardRef.current || !cardPosition) return;
    storeCardPosition(cardRef, clashId);
  }, [cardPosition]);
};

export default useAnimateCardPositionChange;
