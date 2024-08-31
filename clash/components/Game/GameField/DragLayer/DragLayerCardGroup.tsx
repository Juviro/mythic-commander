import React, { RefObject, useContext, useLayoutEffect } from 'react';
import { XYCoord } from 'react-dnd';
import { createPortal } from 'react-dom';

import { DropCardGroup } from 'types/dnd.types';
import GameStateContext from 'components/Game/GameStateContext';

import { pluralizeCards } from 'utils/i18nUtils';
import { BattlefieldCard as BattlefieldCardType } from 'backend/database/gamestate.types';
import BattlefieldCard from '../PlayerInterface/Battlefield/BattlefieldCard/BattlefieldCard';
import { getRectangle } from '../PlayerInterface/Battlefield/BattlefieldSelection/SelectionRectangle';

import styles from './DragLayerCardGroup.module.css';
import useCardGroupDragAlign from './useCardGroupDragAlign';

const setRectangle = (
  wrapperRef: RefObject<HTMLDivElement>,
  rectRef: RefObject<HTMLDivElement>,
  cards: BattlefieldCardType[]
) => {
  const cardElements = cards
    .map((card) => document.querySelector(`[data-card-id="${card.clashId}-preview"]`))
    .filter(Boolean) as Element[];

  const rect = getRectangle(cardElements);
  if (!rect.width || !rect.height) return;

  const wrapperTop = wrapperRef.current?.getBoundingClientRect().top ?? 0;
  const wrapperLeft = wrapperRef.current?.getBoundingClientRect().left ?? 0;

  const top = rect.marginTop - wrapperTop;
  const left = rect.marginLeft - wrapperLeft;
  const { width, height } = rect;

  const { style } = rectRef.current!;
  style.marginTop = `${top}px`;
  style.marginLeft = `${left}px`;
  style.width = `${width}px`;
  style.height = `${height}px`;
};

interface Props {
  group: DropCardGroup;
  differenceFromInitialOffset: XYCoord;
}

const DragLayerCardGroup = ({ group, differenceFromInitialOffset }: Props) => {
  const wrapperRef = React.createRef<HTMLDivElement>();
  const rectRef = React.createRef<HTMLDivElement>();
  const { gameState } = useContext(GameStateContext);

  const player = gameState!.players.find((p) => p.id === group.battlefieldPlayerId)!;

  const cards = group.cardIds.map((cardId) => {
    return player.zones.battlefield.find((c) => c.clashId === cardId)!;
  });

  const battlefield = document.getElementById(
    `battlefield-${player.id}`
  ) as HTMLDivElement;

  const { transformedCards } = useCardGroupDragAlign(
    battlefield,
    differenceFromInitialOffset,
    cards
  );

  useLayoutEffect(() => {
    setRectangle(wrapperRef, rectRef, cards);
  }, [transformedCards]);

  return createPortal(
    <div className={styles.wrapper} ref={wrapperRef}>
      <div
        className={styles.selection_rectangle}
        ref={rectRef}
        id="preview-selection-rect"
      >
        <div className={styles.selection_info}>
          {`${pluralizeCards(group.cardIds.length)} selected`}
        </div>
      </div>
      {transformedCards.map((card) => (
        <BattlefieldCard
          card={card}
          key={card.clashId}
          player={player}
          inSelection
          inPreview
        />
      ))}
    </div>,
    battlefield
  );
};

export default DragLayerCardGroup;
