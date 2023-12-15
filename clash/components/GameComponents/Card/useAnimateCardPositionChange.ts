import { useContext, useLayoutEffect } from 'react';

import { Card, Zone } from 'backend/database/gamestate.types';
import CardPositionContext, {
  CardPosition,
  CardPositions,
} from 'components/Game/CardPositionContext';

const ANIMATION_THRESHOLD = 10;

const storeCardPosition = (
  cardRef: React.RefObject<HTMLDivElement>,
  card: Card,
  isVisible: boolean,
  cardPositions: CardPositions,
  zone?: Zone
) => {
  if (!cardRef.current) return;
  const parent = cardRef.current.parentNode as HTMLDivElement;
  const { width, x, y } = parent.getBoundingClientRect();
  // eslint-disable-next-line no-param-reassign
  cardPositions.current[card.clashId] = {
    isVisible,
    width,
    x,
    y,
    zone,
    tapped: 'tapped' in card && card.tapped,
  };
};

const animateDirectPositionChange = (
  storedPosition: CardPosition,
  cardRef: React.RefObject<HTMLDivElement>
) => {
  const { width, x, y } = cardRef.current!.getBoundingClientRect();
  let deltaX = storedPosition.x - x;
  let deltaY = storedPosition.y - y;
  const deltaWidth = storedPosition.width / width;

  // prevent animation after clearing selection
  const isTapped = Boolean(cardRef.current!.closest("[data-tapped='true']"));
  const wasTapped = storedPosition.tapped;
  if (wasTapped !== isTapped) {
    return Promise.resolve(true);
  }

  if (isTapped) {
    deltaY = (storedPosition.x - x) * -1;
    deltaX = storedPosition.y - y;
  }

  const isWithinThreshold =
    Math.abs(deltaX) < ANIMATION_THRESHOLD &&
    Math.abs(deltaY) < ANIMATION_THRESHOLD &&
    Math.abs(deltaWidth) < ANIMATION_THRESHOLD;

  if (isWithinThreshold) return Promise.resolve(true);

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

  const animation = cardRef.current!.animate(animationSteps, {
    duration: 300,
    easing: 'ease-in-out',
  });

  return new Promise((resolve) => {
    animation.onfinish = () => {
      resolve(true);
    };
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
              translateY(-150px)
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

  // adds a temporary "backside" to the card
  cardRef.current?.classList.add('add_backside');
  const animation = cardRef.current!.animate(animationSteps, {
    duration: 1000,
    easing: 'cubic-bezier(.18,.55,.36,.99)',
  });

  animation.onfinish = () => {
    cardRef.current?.classList.remove('add_backside');
  };

  return new Promise((resolve) => {
    animation.onfinish = () => {
      cardRef.current?.classList.remove('add_backside');
      resolve(true);
    };
  });
};

const animateCardPositionChange = async (
  cardRef: React.RefObject<HTMLDivElement>,
  card: Card,
  cardPositions: CardPositions,
  isVisible: boolean,
  zone?: Zone
) => {
  const storedPosition = cardPositions.current[card.clashId];
  if (!cardRef.current || !storedPosition) return;

  const shouldAnimateInArc = () => {
    if (zone === 'hand' && storedPosition.zone === 'library') {
      return true;
    }
    return false;
  };

  if (shouldAnimateInArc()) {
    await animateArcPositionChange(storedPosition, cardRef, isVisible);
  } else {
    await animateDirectPositionChange(storedPosition, cardRef);
  }

  storeCardPosition(cardRef, card, isVisible, cardPositions, zone);
};

interface Props {
  card: Card;
  cardRef: React.RefObject<HTMLDivElement>;
  zone?: Zone;
  noAnimation?: boolean;
}

const useAnimateCardPositionChange = ({ card, cardRef, noAnimation, zone }: Props) => {
  const { cardPositions } = useContext(CardPositionContext);

  const cardPosition = 'position' in card ? card.position : { x: 0, y: 0 };
  const isVisible = 'id' in card;
  const isTapped = 'tapped' in card && card.tapped;
  const { clashId } = card;

  const positionSum = Math.round((cardPosition?.x || 0) + (cardPosition?.y || 0));

  useLayoutEffect(() => {
    if (noAnimation) return;

    if (cardPositions.current[clashId] && cardRef.current) {
      animateCardPositionChange(cardRef, card, cardPositions, isVisible, zone);
    } else {
      storeCardPosition(cardRef, card, isVisible, cardPositions, zone);
    }
  }, [positionSum, isTapped]);
};

export default useAnimateCardPositionChange;
