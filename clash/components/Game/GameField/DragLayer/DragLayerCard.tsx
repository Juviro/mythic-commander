import React, { CSSProperties, useContext } from 'react';
import classNames from 'classnames';

import { getColorVariable } from 'components/GameComponents/ColoredPlayerName/ColoredPlayerName';
import Card from 'components/GameComponents/Card/Card';

import { VisibleBattlefieldCard } from 'backend/database/gamestate.types';
import CardPositionContext from 'components/Game/CardPositionContext';
import GameStateContext from 'components/Game/GameStateContext';
import { XYCoord } from 'react-dnd';
import useCardDragAlign from './useCardDragAlign';

import styles from './DragLayerCard.module.css';

interface Props {
  item: VisibleBattlefieldCard;
  currentOffset: XYCoord;
}

const DragLayerCard = ({ item, currentOffset }: Props) => {
  const { battlefieldCardWidth } = useContext(GameStateContext);
  const { hoveredBattlefield } = useContext(CardPositionContext);

  const { cardToAlign, left, top, isSnapping } = useCardDragAlign(item, currentOffset);

  const shouldFlip = Boolean(hoveredBattlefield.current?.element.closest('.flipped'));

  const style = {
    '--top': `${top}px`,
    '--left': `${left}px`,
    '--player-color': getColorVariable(item.ownerId),
    '--size-card-width': `${battlefieldCardWidth}px`,
  } as CSSProperties;

  return (
    <div
      style={style}
      className={classNames(styles.card_wrapper, {
        [styles.card_wrapper__stacked_behind]: cardToAlign?.position === 'topLeft',
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

export default DragLayerCard;
