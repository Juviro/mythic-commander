import { RefObject, useContext, useMemo } from 'react';

import {
  BattlefieldCard,
  Player,
  VisibleBattlefieldCard,
  ZONES,
} from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import {
  getClosesGrid,
  STACK_DISTANCE_X,
  STACK_DISTANCE_Y,
} from 'components/Game/GameField/DragLayer/useCardDragAlign';
import { getRelativeToAbsoluteFactor } from 'components/Game/GameField/DragLayer/useCardGroupDragAlign';
import useGameActions from 'components/Game/useGameActions';
import { PermanentCardType } from 'utils/cardTypes';
import {
  HORIZONTAL_GRID_SIZE,
  VERTICAL_GRID_SIZE,
} from '../BattlefieldGrid/BattlefieldGrid';

const MIN_STACKED_CARDS = 2;
const PADDING_FACTOR = 1.5;
const MIN_BATTLEFIELD_PADDING = 100;

interface Props {
  player: Player;
  battlefieldRef: RefObject<HTMLDivElement | null>;
}

const getColumnWidth = (minColumnWidth: number, battlefieldWidth: number) => {
  const gridSize = battlefieldWidth / HORIZONTAL_GRID_SIZE;

  let columnWidth = 0;
  while (columnWidth < minColumnWidth) {
    columnWidth += gridSize;
  }

  return columnWidth;
};

const LAND_COLOR_ORDER = ['W', 'U', 'B', 'R', 'G'];

const sumLandColors = (land: VisibleBattlefieldCard) => {
  if (!land.produced_mana) return 0;

  return land.produced_mana.reduce((sum, mana) => {
    return sum + LAND_COLOR_ORDER.indexOf(mana);
  }, 0);
};

const isCardType = (card: BattlefieldCard, type: PermanentCardType) => {
  const side = card.transformed ? 1 : 0;
  return 'type_line' in card && card.type_line.split('//')?.at(side)?.includes(type);
};

const sortLandsByColor = (lands: VisibleBattlefieldCard[]) => {
  return lands.sort((a, b) => {
    if (isCardType(a, 'Land') !== isCardType(b, 'Land')) {
      return isCardType(a, 'Land') ? -1 : 1;
    }

    if (!a.produced_mana || !b.produced_mana) {
      return a.produced_mana ? -1 : 1;
    }

    if (a.produced_mana.length !== b.produced_mana.length) {
      return a.produced_mana.length - b.produced_mana.length;
    }

    const aSum = sumLandColors(a);
    const bSum = sumLandColors(b);

    return aSum - bSum;
  });
};

const useOrganizeLands = ({ battlefieldRef, player }: Props) => {
  const { battlefieldCardWidth, battlefieldCardHeight } = useContext(GameStateContext);
  const { onMoveCard } = useGameActions();

  const cardsToOrder = useMemo(() => {
    return player.zones.battlefield.filter((card) => {
      if (card.name === 'Treasure') return false;
      if (isCardType(card, 'Creature')) return false;
      if (isCardType(card, 'Land')) return true;

      if ('produced_mana' in card && card.produced_mana) {
        return isCardType(card, 'Artifact');
      }
      return false;
    }) as VisibleBattlefieldCard[];
  }, [player.zones.battlefield.length]);

  const organizeLands = () => {
    if (!battlefieldRef.current) return;
    const { factorX, factorY } = getRelativeToAbsoluteFactor(battlefieldRef.current!);

    const sortedLands = sortLandsByColor(cardsToOrder);

    const minColumnWidth = battlefieldCardWidth * PADDING_FACTOR;
    const battlefieldWidth = battlefieldRef.current.clientWidth;
    const columnWidth = getColumnWidth(minColumnWidth, battlefieldWidth);

    const maxNumberOfColumns = Math.floor(
      (battlefieldWidth - 2 * MIN_BATTLEFIELD_PADDING) / columnWidth
    );

    const numberOfColumns = Math.min(
      Math.ceil(sortedLands.length / MIN_STACKED_CARDS),
      maxNumberOfColumns
    );

    const totalWidth = columnWidth * numberOfColumns;
    const padding = (battlefieldWidth - totalWidth) / 2;

    const relativeY =
      (battlefieldRef.current!.clientHeight - battlefieldCardHeight * PADDING_FACTOR) /
      factorY;

    // set index to make sure the cards are stacked in the correct order
    let positionIndex = 0;
    const moveCard = (card: BattlefieldCard, x: number, y: number) => {
      onMoveCard(card.clashId, ZONES.BATTLEFIELD, player.id, {
        position: { x, y },
        index: positionIndex,
      });
      positionIndex += 1;
    };

    const numberOfLandsPerColumn = Math.ceil(sortedLands.length / numberOfColumns);

    // We only need to calculate the very first card position.
    // All other cards will be placed relative to this one.
    let firstCardPosition = { x: 0, y: 0 };

    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex += 1) {
      const numberOfRemainingLands = sortedLands.length;
      const numberOfRemainingColumns = numberOfColumns - columnIndex;
      const numberOfLandsInThisColumn = Math.min(
        numberOfLandsPerColumn,
        Math.ceil(numberOfRemainingLands / numberOfRemainingColumns)
      );
      const column = sortedLands.splice(0, numberOfLandsInThisColumn);

      // eslint-disable-next-line no-loop-func
      column.forEach((card, cardIndex) => {
        if (firstCardPosition.x || firstCardPosition.y) {
          const xOffset = (columnIndex * columnWidth) / factorX;
          const x =
            firstCardPosition.x + (STACK_DISTANCE_X * cardIndex) / factorX + xOffset;
          const y = firstCardPosition.y + (STACK_DISTANCE_Y * cardIndex) / factorY;
          moveCard(card, x, y);
          return;
        }

        const relativeX = (padding + columnIndex * columnWidth) / factorX;

        const snappedX = getClosesGrid(relativeX, VERTICAL_GRID_SIZE);
        const snappedY = getClosesGrid(relativeY, HORIZONTAL_GRID_SIZE);

        const fixedX = snappedX + (battlefieldCardWidth + 2) / 2 / factorX;
        const fixedY = snappedY + (battlefieldCardHeight + 2) / 2 / factorY;

        firstCardPosition = { x: fixedX, y: fixedY };

        moveCard(card, fixedX, fixedY);
      });
    }
  };

  return { organizeLands, cardsToOrder };
};

export default useOrganizeLands;
