import { useEffect, useState } from 'react';
import { useQueryParam, BooleanParam } from 'use-query-params';
import { sumBy } from 'lodash';

import keyCodes from '../../../../../constants/keyCodes';
import { isInputField, isModifierKey } from '../../../../Hooks/useShortcut';

const getPossibleNewPosition = (x, y, direction) => {
  switch (direction) {
    case keyCodes.ARROW_LEFT:
      return { x: x - 1, y };
    case keyCodes.ARROW_RIGHT:
      return { x: x + 1, y };
    case keyCodes.ARROW_DOWN:
      return { x, y: y + 1 };
    case keyCodes.ARROW_TOP:
      return { x, y: y - 1 };
    default:
      return { x, y };
  }
};

const getNextItem = (cardGrid, selectedCardId, direction) => {
  if (!selectedCardId) return cardGrid[0][0];
  const x = cardGrid.findIndex(columns =>
    columns.find(({ id }) => id === selectedCardId)
  );
  const y = cardGrid[x].findIndex(({ id }) => id === selectedCardId);
  const lastColumnIndex = cardGrid.length - 1;
  const lastRowIndex = cardGrid[x].length - 1;
  const possibleNewPosition = getPossibleNewPosition(x, y, direction);

  const nextX = Math.min(Math.max(possibleNewPosition.x, 0), lastColumnIndex);
  const nextY = Math.min(Math.max(possibleNewPosition.y, 0), lastRowIndex);

  // find the highest-index card if y index is too high
  let actualY = nextY;
  while (!cardGrid[nextX][actualY]) {
    actualY--;
  }

  return cardGrid[nextX][actualY];
};

export default columns => {
  const [isBlocked] = useQueryParam('blockShortcuts', BooleanParam);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const numberOfCards = sumBy(columns.flat(), ({ cards }) => cards.length);
  const cardGrid = columns.map(column =>
    column.map(({ cards }) => cards).flat()
  );

  const moveSelected = direction => {
    const nextElement = getNextItem(cardGrid, selectedCardId, direction);
    setSelectedCardId(nextElement.id);
  };

  const selectNextCard = () => {
    const directions = [
      keyCodes.ARROW_DOWN,
      keyCodes.ARROW_UP,
      keyCodes.ARROW_LEFT,
      keyCodes.ARROW_RIGHT,
    ];
    // eslint-disable-next-line
    for (const direction of directions) {
      console.log('direction :', direction);
      const possibleNextElement = getNextItem(
        cardGrid,
        selectedCardId,
        direction
      );
      if (possibleNextElement.id !== selectedCardId) {
        setSelectedCardId(possibleNextElement.id);
        return;
      }
    }
    setSelectedCardId(null);
  };

  const onKeyDown = event => {
    if (
      isInputField(event) ||
      isModifierKey(event) ||
      isBlocked ||
      !numberOfCards
    )
      return;
    let preventDefault = true;

    switch (event.keyCode) {
      case keyCodes.ARROW_LEFT:
      case keyCodes.ARROW_RIGHT:
      case keyCodes.ARROW_TOP:
      case keyCodes.ARROW_DOWN:
        moveSelected(event.keyCode);
        break;
      default:
        preventDefault = false;
        break;
    }
    if (preventDefault) event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);
    return () => document.removeEventListener('keydown', onKeyDown, false);
  });

  return { selectedCardId, setSelectedCardId, selectNextCard };
};
