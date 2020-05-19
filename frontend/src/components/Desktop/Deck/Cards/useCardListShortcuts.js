import { useEffect, useState, useContext } from 'react';
import { sumBy } from 'lodash';

import keyCodes from '../../../../constants/keyCodes';
import { isInputField, isModifierKey } from '../../../Hooks/useShortcut';
import FocusContext from '../../../Provider/FocusProvider/FocusProvider';

const getPossibleNewPosition = (x, y, direction) => {
  switch (direction) {
    case keyCodes.ARROW_LEFT:
      return { x: x - 1, y };
    case keyCodes.ARROW_RIGHT:
      return { x: x + 1, y };
    case keyCodes.ARROW_DOWN:
      return { x, y: y + 1 };
    case keyCodes.ARROW_UP:
      return { x, y: y - 1 };
    default:
      return { x, y };
  }
};

const getNextItem = (cardGrid, selectedCardOracleId, direction) => {
  if (!selectedCardOracleId) return cardGrid[0][0];
  const x = cardGrid.findIndex(columns =>
    columns.find(({ oracle_id }) => oracle_id === selectedCardOracleId)
  );
  const y = cardGrid[x].findIndex(
    ({ oracle_id }) => oracle_id === selectedCardOracleId
  );
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
  const [selectedCardOracleId, setSelectedCardOracleId] = useState(null);
  const { focusedElements } = useContext(FocusContext);
  const shortcutsActive =
    focusedElements.filter(focusId => focusId !== 'modal.cardDetails').pop() ===
    'deck.cards';

  const numberOfCards = sumBy(columns.flat(), ({ cards }) => cards.length);
  const cardGrid = columns.map(column =>
    column.map(({ cards }) => cards).flat()
  );

  const moveSelected = direction => {
    const nextElement = getNextItem(cardGrid, selectedCardOracleId, direction);
    setSelectedCardOracleId(nextElement.oracle_id);
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
      const possibleNextElement = getNextItem(
        cardGrid,
        selectedCardOracleId,
        direction
      );
      if (possibleNextElement.oracle_id !== selectedCardOracleId) {
        setSelectedCardOracleId(possibleNextElement.oracle_id);
        return;
      }
    }
    setSelectedCardOracleId(null);
  };

  const onKeyDown = event => {
    if (
      isInputField(event) ||
      isModifierKey(event) ||
      !numberOfCards ||
      !shortcutsActive
    )
      return;
    let preventDefault = true;

    switch (event.keyCode) {
      case keyCodes.ARROW_LEFT:
      case keyCodes.ARROW_RIGHT:
      case keyCodes.ARROW_UP:
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

  return { selectedCardOracleId, setSelectedCardOracleId, selectNextCard };
};
