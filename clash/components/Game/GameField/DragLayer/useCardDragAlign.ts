import { useContext, useEffect } from 'react';
import { XYCoord } from 'react-dnd';

import { Card } from 'backend/database/gamestate.types';
import CardPositionContext, {
  HoveredBattlefield,
} from 'components/Game/CardPositionContext';
import useIsGridDisabled from 'hooks/useIsGridDisabled';
import GameStateContext from 'components/Game/GameStateContext';
import {
  HORIZONTAL_GRID_SIZE,
  VERTICAL_GRID_SIZE,
} from '../PlayerInterface/Battlefield/BattlefieldGrid/BattlefieldGrid';
import { AttachedCard } from 'backend/constants/wsEvents';

const MIN_DISTANCE_STACK = 40;
export const STACK_DISTANCE_X = 15;
export const STACK_DISTANCE_Y = 25;

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

export interface StackedCard {
  position: 'topLeft' | 'bottomRight';
  element: Element;
  distance: number;
}

interface ClosesCards {
  cardToAlign: StackedCard | null;
}

const getClosestCards = (currentOffset: XYCoord, cards: Element[]) => {
  if (cards.length === 0) return { cardToAlign: null };

  return cards.reduce(
    (closest: ClosesCards, card: Element) => {
      const cardOffsetX = card.getBoundingClientRect().x;
      const diffX = cardOffsetX - currentOffset.x;
      const distanceX = Math.abs(diffX);

      const cardOffsetY = card.getBoundingClientRect().y;
      const diffY = cardOffsetY - currentOffset.y;
      const distanceY = Math.abs(diffY);

      const newClosest = { ...closest };

      if (distanceX < MIN_DISTANCE_STACK && distanceY < MIN_DISTANCE_STACK) {
        if (diffX <= 0 && diffY <= 0) {
          newClosest.cardToAlign = {
            position: 'bottomRight',
            element: card,
            distance: (distanceX + distanceY) / 2,
          };
        }
        if (diffX > 0 && diffY > 0) {
          newClosest.cardToAlign = {
            position: 'topLeft',
            element: card,
            distance: (distanceX + distanceY) / 2,
          };
        }
      }

      return newClosest;
    },
    {
      cardToAlign: null,
    }
  );
};

const getCardsToAlign = (
  item: Card,
  currentOffset: XYCoord | null,
  hoveredBattlefield: HoveredBattlefield | null,
  disabled: boolean
) => {
  if (!hoveredBattlefield || !currentOffset || disabled || 'cardIds' in item) {
    return {
      cardToAlign: null,
    };
  }

  const cards = getOtherCardsFromBattlefield(hoveredBattlefield, item);

  return getClosestCards(currentOffset, cards);
};

export const getClosesGrid = (value: number, gridSize: number) => {
  const gridStep = 100 / gridSize;
  const gridIndex = Math.round(value / gridStep);
  const gridValue = gridIndex * gridStep;
  return gridValue;
};

export const getGridAlign = (
  currentOffset: XYCoord | null,
  hoveredBattlefield: HoveredBattlefield | null,
  disabled: boolean
) => {
  if (!currentOffset || !hoveredBattlefield || disabled) return { x: null, y: null };
  const { element } = hoveredBattlefield;

  const relativeX =
    ((currentOffset.x - element.getBoundingClientRect().x) / element.offsetWidth) * 100;
  const relativeY =
    ((currentOffset.y - element.getBoundingClientRect().y) / element.offsetHeight) * 100;

  const snappedX = getClosesGrid(relativeX, VERTICAL_GRID_SIZE);
  const snappedY = getClosesGrid(relativeY, HORIZONTAL_GRID_SIZE);

  const absoluteX =
    (snappedX / 100) * element.offsetWidth + element.getBoundingClientRect().x;
  const absoluteY =
    (snappedY / 100) * element.offsetHeight + element.getBoundingClientRect().y;

  return {
    x: absoluteX,
    y: absoluteY,
  };
};

const useCardDragAlign = (item: Card, currentOffset: XYCoord | null) => {
  const isSnapDisabled = useIsGridDisabled();
  const { battlefieldCardWidth, battlefieldCardHeight } = useContext(GameStateContext);
  const { hoveredBattlefield, snapChoords } = useContext(CardPositionContext);

  const transformedOffset = currentOffset
    ? {
        x: currentOffset.x - battlefieldCardWidth / 2,
        y: currentOffset.y - battlefieldCardHeight / 2,
      }
    : null;

  const { cardToAlign } = getCardsToAlign(
    item,
    transformedOffset,
    hoveredBattlefield.current!,
    isSnapDisabled
  );

  const { x: gridAlignX, y: gridAlignY } = getGridAlign(
    transformedOffset,
    hoveredBattlefield?.current,
    isSnapDisabled
  );

  let top = transformedOffset?.y ?? 0;
  let left = transformedOffset?.x ?? 0;

  if (cardToAlign) {
    const factor = cardToAlign!.position === 'topLeft' ? -1 : 1;
    top = cardToAlign!.element.getBoundingClientRect().top + STACK_DISTANCE_Y * factor;
    left = cardToAlign!.element.getBoundingClientRect().left + STACK_DISTANCE_X * factor;
  } else if (gridAlignX || gridAlignY) {
    top = gridAlignY!;
    left = gridAlignX!;
  }

  useEffect(() => {
    if (top === null || left === null) return;

    const cardX = left + battlefieldCardWidth / 2;
    const cardY = top + battlefieldCardHeight / 2;

    const getAttachTo = () => {
      if (!cardToAlign) return undefined;
      const order = cardToAlign.position === 'topLeft' ? 'below' : 'above';
      return { clashId: cardToAlign.element.getAttribute('data-card-id')!, order } as AttachedCard;
    };

    snapChoords.current = {
      x: cardX,
      y: cardY,
      attachTo: getAttachTo(),
    };
  }, [top, left]);

  return {
    top,
    left,
    cardToAlign,
    isSnapping: !isSnapDisabled,
  };
};

export default useCardDragAlign;
