import { useContext, useEffect } from 'react';
import { XYCoord } from 'react-dnd';

import { BattlefieldCard } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import CardPositionContext from 'components/Game/CardPositionContext';
import useIsShiftPressed from 'hooks/useIsShiftPressed';
import {
  HORIZONTAL_GRID_SIZE,
  VERTICAL_GRID_SIZE,
} from '../PlayerInterface/Battlefield/BattlefieldGrid/BattlefieldGrid';
import { getClosesGrid } from './useCardDragAlign';

const getRelativeToAbsoluteFactor = (battlefieldElement: HTMLDivElement | null) => {
  const battlefieldRect = battlefieldElement?.getBoundingClientRect();

  return {
    factorX: (battlefieldRect?.width ?? 0) / 100,
    factorY: (battlefieldRect?.height ?? 0) / 100,
  };
};

const getPositionDelta = (
  differenceFromInitialOffset: number,
  factor: number,
  cardPosition: number,
  isSnapDisabled: boolean,
  cardSize: number,
  gridSize: number
) => {
  const relativeChange = differenceFromInitialOffset / factor;
  const cardOffset = cardSize / 2 / factor;

  const topLeft = cardPosition;
  const transformed = topLeft + relativeChange;
  const snapped = isSnapDisabled ? transformed : getClosesGrid(transformed, gridSize);
  const newPosition = snapped + cardOffset;
  const delta = newPosition - cardPosition;

  return delta;
};

const useCardGroupDragAlign = (
  battlefieldElement: HTMLDivElement,
  differenceFromInitialOffset: XYCoord,
  cards: BattlefieldCard[]
) => {
  const isSnapDisabled = useIsShiftPressed();
  const { battlefieldCardWidth, battlefieldCardHeight } = useContext(GameStateContext);
  const { snapChoords } = useContext(CardPositionContext);

  const { factorX, factorY } = getRelativeToAbsoluteFactor(battlefieldElement);

  const leftMostCard = cards.reduce((leftMost, card) => {
    if (card.position!.x < leftMost.position!.x) {
      return card;
    }
    return leftMost;
  }, cards[0]);

  const deltaX = getPositionDelta(
    differenceFromInitialOffset.x,
    factorX,
    leftMostCard.position!.x,
    isSnapDisabled,
    battlefieldCardWidth,
    VERTICAL_GRID_SIZE
  );

  const deltaY = getPositionDelta(
    differenceFromInitialOffset.y,
    factorY,
    leftMostCard.position!.y,
    isSnapDisabled,
    battlefieldCardHeight,
    HORIZONTAL_GRID_SIZE
  );

  useEffect(() => {
    snapChoords.current = {
      groupX: isSnapDisabled ? undefined : deltaX,
      groupY: isSnapDisabled ? undefined : deltaY,
    };
  }, [deltaX, deltaY, isSnapDisabled]);

  const transformedCards: BattlefieldCard[] = cards.map((card) => {
    return {
      ...card,
      tapped: false,
      position: {
        x: card.position!.x + deltaX,
        y: card.position!.y + deltaY,
      },
    };
  });

  return {
    transformedCards,
  };
};

export default useCardGroupDragAlign;