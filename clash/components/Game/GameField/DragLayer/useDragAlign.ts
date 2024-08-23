import { useContext, useEffect, useState } from 'react';
import { XYCoord } from 'react-dnd';

import { Card } from 'backend/database/gamestate.types';
import CardPositionContext, {
  HoveredBattlefield,
} from 'components/Game/CardPositionContext';
import GameStateContext from 'components/Game/GameStateContext';
import {
  HORIZONTAL_GRID_SIZE,
  VERTICAL_GRID_SIZE,
} from '../PlayerInterface/Battlefield/BattlefieldGrid/BattlefieldGrid';

const MIN_DISTANCE_ALIGN = 20;
const MIN_DISTANCE_STACK = 40;
const STACK_DISTANCE_X = 15;
const STACK_DISTANCE_Y = 25;

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

interface Distance {
  distance: number;
  element: Element;
}

interface StackedCard {
  position: 'topLeft' | 'bottomRight';
  element: Element;
  distance: number;
}

interface ClosesCards {
  x: Distance | null;
  y: Distance | null;
  stack: StackedCard | null;
}

const getClosestCards = (currentOffset: XYCoord, cards: Element[]) => {
  if (cards.length === 0) return { x: null, y: null, stack: null };

  return cards.reduce(
    (closest: ClosesCards, card: Element) => {
      const cardOffsetX = card.getBoundingClientRect().x;
      const diffX = cardOffsetX - currentOffset.x;
      const distanceX = Math.abs(diffX);

      const cardOffsetY = card.getBoundingClientRect().y;
      const diffY = cardOffsetY - currentOffset.y;
      const distanceY = Math.abs(diffY);

      const newClosest = { ...closest };

      if (
        distanceX < MIN_DISTANCE_ALIGN &&
        distanceY > MIN_DISTANCE_ALIGN &&
        (closest.x?.distance || Infinity) > distanceX
      ) {
        newClosest.x = {
          distance: distanceX,
          element: card,
        };
      }

      if (
        distanceY < MIN_DISTANCE_ALIGN &&
        distanceX > MIN_DISTANCE_ALIGN &&
        (closest.y?.distance || Infinity) > distanceY
      ) {
        newClosest.y = {
          distance: distanceY,
          element: card,
        };
      }
      if (distanceY < MIN_DISTANCE_ALIGN && distanceX < MIN_DISTANCE_ALIGN) {
        newClosest.y = {
          distance: distanceY,
          element: card,
        };
      }

      if (distanceX < MIN_DISTANCE_STACK && distanceY < MIN_DISTANCE_STACK) {
        if (diffX <= 0 && diffY <= 0) {
          newClosest.stack = {
            position: 'bottomRight',
            element: card,
            distance: (distanceX + distanceY) / 2,
          };
        }
        if (diffX > 0 && diffY > 0) {
          newClosest.stack = {
            position: 'topLeft',
            element: card,
            distance: (distanceX + distanceY) / 2,
          };
        }
      }

      return newClosest;
    },
    {
      x: null,
      y: null,
      stack: null,
    }
  );
};

const getCardsToAlign = (
  item: Card,
  currentOffset: XYCoord | null,
  hoveredBattlefield: HoveredBattlefield | null,
  disabled: boolean
) => {
  if (!hoveredBattlefield || !currentOffset || disabled) {
    return {
      x: null,
      y: null,
      stack: null,
    };
  }
  const cards = getOtherCardsFromBattlefield(hoveredBattlefield, item);

  return getClosestCards(currentOffset, cards);
};

const getGridAlign = (
  currentOffset: XYCoord,
  hoveredBattlefield: HoveredBattlefield | null,
  disabled: boolean
) => {
  if (!currentOffset || !hoveredBattlefield || disabled) return { x: null, y: null };
  const { element } = hoveredBattlefield;

  const relativeX =
    ((currentOffset.x - element.getBoundingClientRect().x) / element.offsetWidth) * 100;
  const relativeY =
    ((currentOffset.y - element.getBoundingClientRect().y) / element.offsetHeight) * 100;

  const getClosesGrid = (value: number, gridSize: number) => {
    const gridStep = 100 / gridSize;
    const gridIndex = Math.round(value / gridStep);
    const gridValue = gridIndex * gridStep;
    return gridValue;
  };

  const snappedX = getClosesGrid(relativeX, VERTICAL_GRID_SIZE);
  const snappedY = getClosesGrid(relativeY, HORIZONTAL_GRID_SIZE);
  const distanceX = Math.abs(relativeX - snappedX);
  const distanceY = Math.abs(relativeY - snappedY);
  const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

  const absoluteX =
    (snappedX / 100) * element.offsetWidth + element.getBoundingClientRect().x;
  const absoluteY =
    (snappedY / 100) * element.offsetHeight + element.getBoundingClientRect().y;

  return {
    x: absoluteX,
    y: absoluteY,
    distance,
  };
};

const useDragAlign = (item: Card, currentOffset: XYCoord | null) => {
  const [isSnapDisabled, setIsSnapDisabled] = useState(true);
  const { battlefieldCardWidth, battlefieldCardHeight } = useContext(GameStateContext);
  const { hoveredBattlefield, snapChoords } = useContext(CardPositionContext);

  useEffect(() => {
    const onDrag = (event: DragEvent) => {
      const isShiftPressed = event.shiftKey;
      setIsSnapDisabled(isShiftPressed);
    };
    const onDragEnd = () => {
      setIsSnapDisabled(false);
    };
    document.addEventListener('drag', onDrag, false);
    document.addEventListener('dragend', onDragEnd, false);

    return () => {
      document.removeEventListener('drag', onDrag, false);
      document.removeEventListener('dragend', onDragEnd, false);
    };
  });

  const transformedOffset = currentOffset
    ? {
        x: currentOffset.x - battlefieldCardWidth / 2,
        y: currentOffset.y - battlefieldCardHeight / 2,
      }
    : null;

  const {
    stack,
    x: cardAlignX,
    y: cardAlignY,
  } = getCardsToAlign(
    item,
    transformedOffset,
    hoveredBattlefield.current!,
    isSnapDisabled
  );

  const {
    x: gridAlignX,
    y: gridAlignY,
    distance: gridDistance,
  } = getGridAlign(transformedOffset!, hoveredBattlefield?.current, isSnapDisabled);

  const isSmalles = (value?: number) => {
    if (typeof value !== 'number') return false;

    const allValues = [
      cardAlignX?.distance,
      cardAlignY?.distance,
      gridDistance,
      stack?.distance,
    ].filter((val) => val || val === 0) as number[];

    return allValues.every((val) => val >= value);
  };

  let top = transformedOffset?.y ?? 0;
  let left = transformedOffset?.x ?? 0;

  if (stack) {
    const factor = stack!.position === 'topLeft' ? -1 : 1;
    top = stack!.element.getBoundingClientRect().top + STACK_DISTANCE_Y * factor;
    left = stack!.element.getBoundingClientRect().left + STACK_DISTANCE_X * factor;
  }
  // else if (cardAlignX) {
  //   left = cardAlignX!.element.getBoundingClientRect().left;
  // } else if (cardAlignY) {
  //   top = cardAlignY!.element.getBoundingClientRect().top;
  // }
  else if (isSmalles(gridDistance)) {
    top = gridAlignY!;
    left = gridAlignX!;
  }

  // if (stack) {
  //   const factor = stack.position === 'topLeft' ? -1 : 1;
  //   top = stack.element.getBoundingClientRect().top + STACK_DISTANCE_Y * factor;
  // } else if (y) {
  //   top = y.element.getBoundingClientRect().top;
  // }

  // if (stack) {
  //   const factor = stack.position === 'topLeft' ? -1 : 1;
  //   left = stack.element.getBoundingClientRect().left + STACK_DISTANCE_X * factor;
  // } else if (x) {
  //   left = x.element.getBoundingClientRect().left;
  // }

  // const getChoord = (element: Element | null | undefined, property: 'x' | 'y') => {
  //   if (!element) return null;
  //   const { x: valX, y: valY } = element.getBoundingClientRect();
  //   if (property === 'x') return valX + (battlefieldCardWidth - 4) / 2;
  //   return valY + (battlefieldCardHeight - 4) / 2;
  // };

  // useEffect(() => {
  //   let choordX = getChoord(x?.element, 'x');
  //   let choordY = getChoord(y?.element, 'y');

  //   if (stack) {
  //     const factor = stack.position === 'topLeft' ? -1 : 1;
  //     choordX = getChoord(stack.element, 'x')! + factor * STACK_DISTANCE_X;
  //     choordY = getChoord(stack.element, 'y')! + factor * STACK_DISTANCE_Y;
  //   }

  //   const placeBehindOthers = stack?.position === 'topLeft';

  //   snapChoords.current = {
  //     x: choordX ?? null,
  //     y: choordY ?? null,
  //     placeBehindOthers,
  //   };
  // }, [x?.element, y?.element, stack?.element]);

  useEffect(() => {
    if (top === null || left === null) return;

    const cardX = left + battlefieldCardWidth / 2;
    const cardY = top + battlefieldCardHeight / 2;

    const placeBehindOthers = stack?.position === 'topLeft';

    snapChoords.current = {
      x: cardX,
      y: cardY,
      placeBehindOthers,
    };
  }, [top, left]);

  return {
    top,
    left,
    cardToAlign: {
      x: null,
      y: null,
      // x: cardAlignX,
      // y: cardAlignY,
      stack,
    },
  };
};

export default useDragAlign;
