import { useLayoutEffect } from 'react';

import { Card, Zone } from 'backend/database/gamestate.types';
import { CardPosition } from 'types';

const ANIMATION_DURATION = 300;

const storeCardPosition = (
  cardRef: React.RefObject<HTMLDivElement>,
  clashId: string,
  isVisible: boolean,
  zone?: Zone
) => {
  if (!cardRef.current) return;
  const { width, x, y } = cardRef.current.getBoundingClientRect();
  window.cardPostions[clashId] = {
    isVisible,
    width,
    x,
    y,
    zone,
  };
};

const animateDirectPositionChange = (
  storedPosition: CardPosition,
  cardRef: React.RefObject<HTMLDivElement>
) => {
  const { width, x, y } = cardRef.current!.getBoundingClientRect();
  const deltaX = storedPosition.x - x;
  const deltaY = storedPosition.y - y;
  const deltaWidth = storedPosition.width / width;

  const transformFrom = `translate(${deltaX}px, ${deltaY}px) scale(${deltaWidth})`;

  const transformTo = `translate(0px, 0px) scale(1)`;

  const animationSteps = [
    {
      transform: transformFrom,
    },
    {
      transform: transformTo,
    },
  ];

  cardRef.current!.animate(animationSteps, {
    duration: ANIMATION_DURATION,
    easing: 'ease-in-out',
  });
};

const animateArcPositionChange = (
  storedPosition: CardPosition,
  cardRef: React.RefObject<HTMLDivElement>
) => {
  const { width, x } = cardRef.current!.getBoundingClientRect();

  const deltaX = storedPosition.x - storedPosition.width / 2 - x;
  const deltaWidth = storedPosition.width / width;
  const radius = Math.abs(deltaX / 2);

  const from = `
            translateX(${-radius}px)
            rotate(calc((180 - var(--rotation)) * 1deg)) 
            translateX(${radius}px)
            scale(${deltaWidth})
            rotate(-180deg)
            translateY(-200px)
            rotateY(180deg)
          `;
  const to = `
            translateX(${-radius}px)
            rotate(360deg) 
            translateX(${radius}px) 
            scale(1)
            rotate(-360deg)
            rotateY(0deg)
          `;

  const animationSteps = [
    {
      transform: from,
    },
    {
      transform: to,
    },
  ];

  const duration = 1000;

  cardRef.current!.animate(animationSteps, {
    duration,
    easing: 'cubic-bezier(.18,.55,.36,.99)',
  });
};

const animateCardPositionChange = (
  cardRef: React.RefObject<HTMLDivElement>,
  clashId: string,
  isVisible: boolean,
  zone?: Zone
) => {
  const storedPosition = window.cardPostions[clashId];
  if (!cardRef.current || !storedPosition) return;

  const fromLibToHand = storedPosition.zone === 'library' && zone === 'hand';
  if (fromLibToHand) {
    animateArcPositionChange(storedPosition, cardRef);
  } else {
    animateDirectPositionChange(storedPosition, cardRef);
  }

  window.cardPostions[clashId] = null;
};

const useAnimateCardPositionChange = (
  card: Card,
  cardRef: React.RefObject<HTMLDivElement>,
  zone?: Zone
) => {
  const cardPosition = 'position' in card ? card.position : undefined;
  const isVisible = 'id' in card;
  const { clashId } = card;

  useLayoutEffect(() => {
    if (window.cardPostions[clashId] && cardRef.current) {
      animateCardPositionChange(cardRef, clashId, isVisible, zone);
    }

    return () => {
      storeCardPosition(cardRef, clashId, isVisible, zone);
    };
  }, [JSON.stringify(cardPosition)]);

  useLayoutEffect(() => {
    if (!cardRef.current || !cardPosition) return;
    storeCardPosition(cardRef, clashId, isVisible, zone);
  }, [cardPosition]);
};

export default useAnimateCardPositionChange;
