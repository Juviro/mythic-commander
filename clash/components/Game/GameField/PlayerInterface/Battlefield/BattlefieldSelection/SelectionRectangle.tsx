import React, { RefObject, useContext, useLayoutEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';

import { DndItemTypes, DropCardGroupOffset } from 'types/dnd.types';
import useWindowSize from 'hooks/useWindowSize';
import { Player, ZONES } from 'backend/database/gamestate.types';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';
import useCardActions from 'components/GameComponents/Card/cardActions/useCardActions';
import styles from './BattlefieldSelection.module.css';
import BattlefieldSelectionContext from './BattlefieldSelectionContext';
import BattlefieldCard from '../BattlefieldCard/BattlefieldCard';

const PADDING = 15;
const BORDER_WIDTH = 2;

const getRectangle = (cards: Element[]) => {
  if (cards.length === 0) return {};

  const bounds = cards.reduce(
    (acc, card) => {
      const { top, left, width, height } = card.getBoundingClientRect();

      return {
        top: Math.min(acc.top, top),
        left: Math.min(acc.left, left),
        width: Math.max(acc.width, left + width),
        height: Math.max(acc.height, top + height),
      };
    },
    {
      top: Infinity,
      left: Infinity,
      width: 0,
      height: 0,
    }
  );

  const top = bounds.top - PADDING + BORDER_WIDTH;
  const left = bounds.left - PADDING + BORDER_WIDTH;

  return {
    marginTop: top,
    marginLeft: left,
    width: bounds.width - bounds.left + PADDING * 2,
    height: bounds.height - bounds.top + PADDING * 2,
  };
};

interface Props {
  selectedCardIds: string[];
  wrapperRef: RefObject<HTMLDivElement>;
  isFlipped: boolean;
  player: Player;
}

const SelectionRectangle = ({
  selectedCardIds,
  wrapperRef,
  isFlipped,
  player,
}: Props) => {
  const { selectionRectangleRef } = useContext(BattlefieldSelectionContext);
  const [offset, setOffset] = useState<DropCardGroupOffset | null>(null);

  useWindowSize();

  const { contextMenuItems } = useCardActions({
    cardIds: selectedCardIds,
    battlefieldPlayerId: player.id,
    zone: ZONES.BATTLEFIELD,
  });

  const setRectangle = () => {
    if (!selectionRectangleRef.current || !selectedCardIds.length) return;
    const cards = selectedCardIds
      .map((id) => document.querySelector(`[data-card-id="${id}"]`))
      .filter(Boolean) as Element[];

    cards.at(0)?.addEventListener('transitionend', setRectangle);

    const rect = getRectangle(cards);
    const { style } = selectionRectangleRef.current;

    if (!rect.width || !rect.height) return;

    const wrapperTop = wrapperRef.current?.getBoundingClientRect().top ?? 0;
    const wrapperLeft = wrapperRef.current?.getBoundingClientRect().left ?? 0;

    const top = rect.marginTop - wrapperTop;
    const left = rect.marginLeft - wrapperLeft;
    const { width, height } = rect;

    style.marginTop = `${top}px`;
    style.marginLeft = `${left}px`;
    style.width = `${width}px`;
    style.height = `${height}px`;

    if (offset?.x === left && offset?.y === top) return;

    setOffset({
      x: left,
      y: top,
      width,
      height,
      isFlipped: Boolean(isFlipped),
    });
  };

  useLayoutEffect(() => {
    setRectangle();
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: DndItemTypes.CARD_GROUP,
    item: {
      cardIds: selectedCardIds,
      offset,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const selectedCards = player.zones.battlefield.filter((card) =>
    selectedCardIds.includes(card.clashId)
  );

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      className={styles.selection_rectangle_wrapper}
    >
      <ContextMenu items={contextMenuItems}>
        <div
          ref={(val) => {
            dragRef(val);
            // @ts-ignore
            selectionRectangleRef.current = val;
          }}
          className={classNames(styles.selection_rectangle, {
            [styles.selection_rectangle__visible]: selectedCardIds.length,
            [styles.selection_rectangle__dragging]: isDragging,
          })}
        >
          {selectedCards.map((card) => (
            <BattlefieldCard card={card} key={card.clashId} player={player} inSelection />
          ))}
        </div>
      </ContextMenu>
    </div>
  );
};

export default SelectionRectangle;
