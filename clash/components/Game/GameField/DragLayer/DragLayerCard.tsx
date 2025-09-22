import React, { CSSProperties, useContext } from 'react';
import classNames from 'classnames';
import { XYCoord } from 'react-dnd';

import { getColorVariable } from 'components/GameComponents/ColoredPlayerName/ColoredPlayerName';
import Card from 'components/GameComponents/Card/Card';
import { VisibleBattlefieldCard } from 'backend/database/gamestate.types';
import CardPositionContext from 'components/Game/CardPositionContext';
import GameStateContext from 'components/Game/GameStateContext';
import useCardDragAlign from './useCardDragAlign';

import styles from './DragLayerCard.module.css';
import { createPortal } from 'react-dom';

interface Props {
  item: VisibleBattlefieldCard;
  currentOffset: XYCoord;
}

const DragLayerCard = ({ item, currentOffset }: Props) => {
  const { battlefieldCardWidth } = useContext(GameStateContext);
  const { hoveredBattlefield } = useContext(CardPositionContext);

  const { cardToAlign, left, top, isSnapping } = useCardDragAlign(item, currentOffset);

  const shouldFlip = Boolean(hoveredBattlefield.current?.element.closest('.transformed'));

  const style = {
    '--top': `${top}px`,
    '--left': `${left}px`,
    '--player-color': getColorVariable(item.ownerId),
    '--size-card-width': `${battlefieldCardWidth}px`,
  } as CSSProperties;

  const getAttachText = () => {
    if (cardToAlign!.position === 'topLeft') return 'Attach below';
    return 'Attach above';
  };

  const component = (
    <div
      style={style}
      className={classNames(styles.card_wrapper, {
        [styles.card_wrapper__stacked_behind]: cardToAlign?.position === 'topLeft',
      })}
    >
      {cardToAlign && (
        <div className={classNames(styles.card_to_align, styles.card_tooltip)}>
          {getAttachText()}
        </div>
      )}
      <div
        className={classNames(styles.card, {
          [styles.card__flipped]: shouldFlip,
        })}
      >
        <Card
          card={{ ...item, tapped: false }}
          noAnimation
          transformed={item.transformed}
        />
      </div>
      {isSnapping && !cardToAlign && (
        <div className={classNames(styles.shift_tooltip, styles.card_tooltip)}>Hold Shift to disabled snapping</div>
      )}
    </div>
  );

  if (!hoveredBattlefield.current?.playerId) {
    return component;
  }

  const dropzone = document.getElementById(`battlefield-dropzone-${hoveredBattlefield.current.playerId}`);
  if (!dropzone) {
    return component;
  }

  return createPortal(component, dropzone!);
};

export default DragLayerCard;
