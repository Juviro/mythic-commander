import React, { useRef } from 'react';
import classNames from 'classnames';

import { Player, VisibleCard } from 'backend/database/gamestate.types';

import styles from './Hand.module.css';
import HandCard from './HandCard';
import useHandHover from './useHandHover';

const getMaxDegree = (length: number) => {
  if (length === 2) return 4;
  if (length === 3) return 7.5;
  if (length === 4) return 10;
  if (length === 5) return 12.5;
  if (length === 6) return 13.5;
  if (length === 7) return 15;
  return 17.5;
};

const getRotation = (index: number, numberOfCards: number) => {
  if (numberOfCards <= 1) {
    return 0;
  }

  const from = getMaxDegree(numberOfCards) * -1;
  const to = getMaxDegree(numberOfCards);

  const rotation = (from + ((to - from) / (numberOfCards - 1)) * index) * 0.5;
  return rotation;
};

const getCardStyles = (index: number, numberOfCards: number) => {
  const rotation = getRotation(index, numberOfCards);

  return {
    '--rotation': rotation,
    '--additional-hover-rotation': Math.min(numberOfCards / 2, 4),
  } as React.CSSProperties;
};

interface Props {
  player: Player;
  isSelf?: boolean;
}

const Hand = ({ player, isSelf }: Props) => {
  const { hand } = player.zones;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    highlightedCardIndex,
    onDragOver,
    onMouseMove,
    dropRef,
    canDrop,
    isDragging,
    setHighlightedCardIndex,
  } = useHandHover({
    wrapperRef,
    hand,
    player,
  });

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapper__is_self]: isSelf,
        [styles.wrapper__can_drop]: canDrop,
      })}
      onMouseMove={onMouseMove}
      onDragOver={onDragOver}
      onDragExit={() => setHighlightedCardIndex(-1)}
      onMouseLeave={() => setHighlightedCardIndex(-1)}
      ref={(val) => {
        dropRef(val);
        // @ts-ignore
        wrapperRef.current = val;
      }}
    >
      {hand.map((card, index) => (
        <React.Fragment key={card.clashId}>
          {(!index || index + 1 === hand.length) && (
            <div
              className={classNames(styles.spacing_element, 'spacing_element')}
              style={getCardStyles(index, hand.length)}
            />
          )}
          <div
            className={classNames(styles.card_wrapper, {
              [styles.card_wrapper__hovered]: highlightedCardIndex === index,
              [styles.card_wrapper__highlighted]: !isDragging,
            })}
            style={getCardStyles(index, hand.length)}
          >
            <HandCard card={card as VisibleCard} isSelf={isSelf} player={player} />
          </div>
        </React.Fragment>
      ))}
      {canDrop && (
        <div
          className={classNames({
            [styles.card_wrapper__dragging]:
              canDrop && highlightedCardIndex === hand.length,
          })}
        />
      )}
    </div>
  );
};

export default Hand;
