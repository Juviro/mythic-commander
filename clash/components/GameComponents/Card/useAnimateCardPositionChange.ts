import { useContext, useLayoutEffect } from 'react';

import { Card, Zone } from 'backend/database/gamestate.types';
import CardPositionContext, {
  CardPosition,
  CardPositions,
} from 'components/Game/CardPositionContext';

const storeCardPosition = (
  cardRef: React.RefObject<HTMLDivElement>,
  clashId: string,
  isVisible: boolean,
  cardPositions: CardPositions,
  zone?: Zone
) => {
  if (!cardRef.current) return;
  const parent = cardRef.current.parentNode as HTMLDivElement;
  const { width, x, y } = parent.getBoundingClientRect();
  // eslint-disable-next-line no-param-reassign
  cardPositions.current[clashId] = {
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
    duration: 300,
    easing: 'ease-in-out',
  });
};

const animateArcPositionChange = (
  storedPosition: CardPosition,
  cardRef: React.RefObject<HTMLDivElement>,
  isVisible?: boolean
) => {
  const { width, x } = cardRef.current!.getBoundingClientRect();

  const deltaX = storedPosition.x - storedPosition.width / 2 - x;
  const deltaWidth = storedPosition.width / width;
  const radius = Math.abs(deltaX / 2);
  const rotateY = storedPosition.isVisible === isVisible ? 0 : 180;

  const from = `
            translateX(${-radius}px)
            rotate(calc((180 - var(--rotation)) * 1deg)) 
            translateX(${radius}px)
            scale(${deltaWidth})
            rotate(-180deg)
            translateY(-200px)
            rotateY(${rotateY}deg)
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

  cardRef.current!.animate(animationSteps, {
    duration: 1000,
    easing: 'cubic-bezier(.18,.55,.36,.99)',
  });
};

const animateCardPositionChange = (
  cardRef: React.RefObject<HTMLDivElement>,
  clashId: string,
  cardPositions: CardPositions,
  zone?: Zone,
  isVisible?: boolean
) => {
  const storedPosition = cardPositions.current[clashId];
  if (!cardRef.current || !storedPosition) return;

  const animateInArc = zone === 'hand';
  if (animateInArc) {
    animateArcPositionChange(storedPosition, cardRef, isVisible);
  } else {
    animateDirectPositionChange(storedPosition, cardRef);
  }

  // eslint-disable-next-line no-param-reassign
  cardPositions.current[clashId] = null;
};

const useAnimateCardPositionChange = (
  card: Card,
  cardRef: React.RefObject<HTMLDivElement>,
  zone?: Zone
) => {
  const { cardPositions } = useContext(CardPositionContext);
  const cardPosition = 'position' in card ? card.position : undefined;
  const isVisible = 'id' in card;
  const { clashId } = card;

  useLayoutEffect(() => {
    if (cardPositions.current[clashId] && cardRef.current) {
      animateCardPositionChange(cardRef, clashId, cardPositions, zone, isVisible);
    }

    return () => {
      storeCardPosition(cardRef, clashId, isVisible, cardPositions, zone);
    };
  }, [JSON.stringify(cardPosition)]);

  useLayoutEffect(() => {
    if (!cardRef.current || !cardPosition) return;
    storeCardPosition(cardRef, clashId, isVisible, cardPositions, zone);
  }, [cardPosition]);
};

export default useAnimateCardPositionChange;
