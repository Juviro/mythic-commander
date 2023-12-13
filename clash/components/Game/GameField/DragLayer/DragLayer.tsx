import React, { CSSProperties, useContext } from 'react';
import { useDragLayer } from 'react-dnd';

import { getColorVariable } from 'components/GameComponents/ColoredPlayerName/ColoredPlayerName';
import GameStateContext from 'components/Game/GameStateContext';
import Card from 'components/GameComponents/Card/Card';

import CardPositionContext from 'components/Game/CardPositionContext';
import classNames from 'classnames';
import { DndItemTypes } from 'types/dnd.types';
import styles from './DragLayer.module.css';
import AlignIndicator from './AlignIndicator';
import useDragAlign from './useDragAlign';

const DragLayer = () => {
  const { battlefieldCardWidth } = useContext(GameStateContext);
  const { hoveredBattlefield } = useContext(CardPositionContext);

  const { isDragging, item, currentOffset, itemType } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
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

  return (
    <div style={style} className={styles.wrapper}>
      {cardToAlign?.x && !cardToAlign.stack && (
        <AlignIndicator
          element={cardToAlign.x.element}
          offset={cardToAlign.y?.element.getBoundingClientRect().y ?? currentOffset.y}
          property="x"
        />
      )}
      {cardToAlign?.y && !cardToAlign.stack && (
        <AlignIndicator
          element={cardToAlign.y.element}
          offset={cardToAlign.x?.element.getBoundingClientRect().x ?? currentOffset.x}
          property="y"
        />
      )}
      <div
        className={classNames({
          [styles.card__flipped]: shouldFlip,
        })}
      >
        <Card card={item} noAnimation />
      </div>
    </div>
  );
};

export default DragLayer;
