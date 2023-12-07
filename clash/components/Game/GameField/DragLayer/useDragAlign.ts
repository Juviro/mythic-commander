import { Card } from 'backend/database/gamestate.types';
import CardPositionContext, {
  HoveredBattlefield,
} from 'components/Game/CardPositionContext';
import { useContext, useEffect } from 'react';
import { XYCoord } from 'react-dnd';

const MIN_DISTANCE = 20;

const getOtherCardsFromBattlefield = (
  hoveredBattlefield: HoveredBattlefield,
  item: Card
) => {
  return Array.from(
    hoveredBattlefield.element.querySelectorAll(`.battlefield_card`)
  ).filter((element) => {
    const cardId = element.getAttribute('data-card-id');
    return cardId !== item.clashId;
  });
};

const getClosestCard = (
  currentOffset: XYCoord,
  cards: Element[],
  property: 'x' | 'y'
) => {
  if (cards.length === 0) return { distance: Infinity, element: null };

  return cards.reduce(
    (
      closest: {
        distance: number;
        element: Element | null;
      },
      card
    ) => {
      const cardOffset = card.getBoundingClientRect()[property];
      const distance = Math.abs(cardOffset - currentOffset[property]);

      if (!closest) {
        return {
          distance,
          element: card,
        };
      }

      if (distance < closest.distance) {
        return {
          distance,
          element: card,
        };
      }
      return closest;
    },
    {
      distance: Infinity,
      element: null,
    }
  );
};

const getCardsToAlign = (
  item: Card,
  currentOffset: XYCoord | null,
  hoveredBattlefield: HoveredBattlefield | null
) => {
  if (!hoveredBattlefield || !currentOffset) return null;
  const cards = getOtherCardsFromBattlefield(hoveredBattlefield, item);
  const closestCardX = getClosestCard(currentOffset, cards, 'x');
  const closestCardY = getClosestCard(currentOffset, cards, 'y');

  return {
    x: closestCardX.distance < MIN_DISTANCE ? closestCardX.element : null,
    y: closestCardY.distance < MIN_DISTANCE ? closestCardY.element : null,
  };
};

const useDragAlign = (item: Card, currentOffset: XYCoord | null) => {
  const { hoveredBattlefield, snapChoords } = useContext(CardPositionContext);
  const cardToAlign = getCardsToAlign(item, currentOffset, hoveredBattlefield.current!);

  const top = cardToAlign?.y
    ? cardToAlign.y.getBoundingClientRect().top
    : currentOffset?.y;

  const left = cardToAlign?.x
    ? cardToAlign.x.getBoundingClientRect().left
    : currentOffset?.x;

  useEffect(() => {
    snapChoords.current = {
      x: Number(cardToAlign?.x?.getAttribute('data-card-x')) || null,
      y: Number(cardToAlign?.y?.getAttribute('data-card-y')) || null,
    };
  }, [cardToAlign?.x, cardToAlign?.y]);

  return {
    top,
    left,
    cardToAlign,
  };
};

export default useDragAlign;
