import React, { CSSProperties, useContext } from 'react';
import { useDragLayer } from 'react-dnd';

import { getColorVariable } from 'components/GameComponents/ColoredPlayerName/ColoredPlayerName';
import GameStateContext from 'components/Game/GameStateContext';
import Card from 'components/GameComponents/Card/Card';

import CardPositionContext from 'components/Game/CardPositionContext';
import classNames from 'classnames';
import { DndItemTypes } from 'types/dnd.types';
import styles from './DragLayer.module.css';
import useDragAlign from './useDragAlign';

const DragLayer = () => {
  const { battlefieldCardWidth } = useContext(GameStateContext);
  const { hoveredBattlefield } = useContext(CardPositionContext);

  const { isDragging, item, currentOffset, itemType } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const { cardToAlign, left, top } = useDragAlign(item, currentOffset);

  if (!item || !currentOffset || !isDragging || itemType !== DndItemTypes.CARD) {
    return null;
  }
  const shouldFlip = Boolean(hoveredBattlefield.current?.element.closest('.flipped'));

  const style = {
    '--top': `${top}px`,
    '--left': `${left}px`,
    '--player-color': getColorVariable(item.ownerId),
    '--size-card-width': `${battlefieldCardWidth}px`,
  } as CSSProperties;

  const isSnapping = Boolean(cardToAlign);

  return (
    <div
      style={style}
      className={classNames(styles.wrapper, {
        [styles.wrapper__stacked_behind]: cardToAlign?.position === 'topLeft',
      })}
    >
      <div
        className={classNames(styles.card, {
          [styles.card__flipped]: shouldFlip,
        })}
      >
        <Card card={item} noAnimation flipped={item.flipped} />
      </div>
      {isSnapping && (
        <div className={styles.shift_tooltip}>Hold Shift to disabled snapping</div>
      )}
    </div>
  );
};

export default DragLayer;
