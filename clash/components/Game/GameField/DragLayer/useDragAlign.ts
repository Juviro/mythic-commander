import { useContext, useEffect, useState } from 'react';
import { XYCoord } from 'react-dnd';

import { Card } from 'backend/database/gamestate.types';
import CardPositionContext, {
  HoveredBattlefield,
} from 'components/Game/CardPositionContext';
import GameStateContext from 'components/Game/GameStateContext';

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
          };
        }
        if (diffX > 0 && diffY > 0) {
          newClosest.stack = {
            position: 'topLeft',
            element: card,
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
  if (!hoveredBattlefield || !currentOffset || disabled)
    return {
      x: null,
      y: null,
      stack: null,
    };
  const cards = getOtherCardsFromBattlefield(hoveredBattlefield, item);

  return getClosestCards(currentOffset, cards);
};

const useDragAlign = (item: Card, currentOffset: XYCoord | null) => {
  const [isSnapDisabled, setIsSnapDisabled] = useState(true);
  const { battlefieldCardWidth, battlefieldCardHeight } = useContext(GameStateContext);
  const { hoveredBattlefield, snapChoords } = useContext(CardPositionContext);

  useEffect(() => {
    const onDrag = (event: DragEvent) => {
      const isSpacePressed = event.shiftKey;
      setIsSnapDisabled(isSpacePressed);
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

  const { x, y, stack } = getCardsToAlign(
    item,
    transformedOffset,
    hoveredBattlefield.current!,
    isSnapDisabled
  );

  let top = transformedOffset?.y ?? 0;
  if (stack) {
    const factor = stack.position === 'topLeft' ? -1 : 1;
    top = stack.element.getBoundingClientRect().top + STACK_DISTANCE_Y * factor;
  } else if (y) {
    top = y.element.getBoundingClientRect().top;
  }

  let left = transformedOffset?.x ?? 0;
  if (stack) {
    const factor = stack.position === 'topLeft' ? -1 : 1;
    left = stack.element.getBoundingClientRect().left + STACK_DISTANCE_X * factor;
  } else if (x) {
    left = x.element.getBoundingClientRect().left;
  }

  const getChoord = (element: Element | null | undefined, property: 'x' | 'y') => {
    if (!element) return null;
    const { x: valX, y: valY } = element.getBoundingClientRect();
    if (property === 'x') return valX + (battlefieldCardWidth - 4) / 2;
    return valY + (battlefieldCardHeight - 4) / 2;
  };

  useEffect(() => {
    let choordX = getChoord(x?.element, 'x');
    let choordY = getChoord(y?.element, 'y');

    if (stack) {
      const factor = stack.position === 'topLeft' ? -1 : 1;
      choordX = getChoord(stack.element, 'x')! + factor * STACK_DISTANCE_X;
      choordY = getChoord(stack.element, 'y')! + factor * STACK_DISTANCE_Y;
    }

    const placeBehindOthers = stack?.position === 'topLeft';

    snapChoords.current = {
      x: choordX ?? null,
      y: choordY ?? null,
      placeBehindOthers,
    };
  }, [x?.element, y?.element, stack?.element]);

  return {
    isSnapDisabled,
    top,
    left,
    cardToAlign: {
      x,
      y,
      stack,
    },
  };
};

export default useDragAlign;
