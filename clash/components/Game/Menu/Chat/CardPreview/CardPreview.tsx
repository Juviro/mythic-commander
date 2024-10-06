import React, { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import CardPositionContext from 'components/Game/CardPositionContext';
import { getImageUrl } from 'utils/getImageUrl';
import { getCardRotation } from 'utils/cardTypes';

import styles from './CardPreview.module.css';

const SCROLL_DELAY = 500;

interface PreviewCard {
  src: string;
  title: string;
  flipped?: boolean;
}

const CardPreview = () => {
  const { hoveredCard } = useContext(CardPositionContext);
  const [displayedCardIndex, setDisplayedCardIndex] = useState(0);
  const lastScroll = useRef(0);

  const cardPreviews: PreviewCard[] = hoveredCard?.id
    ? [
        {
          src: getImageUrl(hoveredCard.id),
          title: 'Front',
        },
      ]
    : [];

  if (hoveredCard?.transformable) {
    cardPreviews.push({
      src: getImageUrl(hoveredCard.id, true),
      title: 'Back',
    });
  }

  if (hoveredCard && 'layout' in hoveredCard && hoveredCard.layout === 'flip') {
    cardPreviews.push({
      src: getImageUrl(hoveredCard.id),
      title: 'Flipped',
      flipped: true,
    });
  }

  if (hoveredCard?.meta?.relatedCards?.length) {
    hoveredCard.meta.relatedCards.forEach((relatedCard) => {
      cardPreviews.push({
        src: getImageUrl(relatedCard.id),
        title: relatedCard.type,
      });
    });
  }

  const hasProperty = (property: 'flipped' | 'transformed') => {
    // @ts-ignore
    return hoveredCard && property in hoveredCard && hoveredCard[property];
  };

  let initialIndex = 0;
  if (hasProperty('flipped') || hasProperty('transformed')) {
    initialIndex = 1;
  }

  useEffect(() => {
    setDisplayedCardIndex(initialIndex);
    const onScroll = (e: WheelEvent) => {
      const isMacTrackpad = e.deltaY % 1 === 0;
      if (isMacTrackpad && Date.now() - lastScroll.current < SCROLL_DELAY) return;

      const scrollDirection = e.deltaY > 0 ? 1 : -1;
      const maxIndex = cardPreviews.length - 1;
      lastScroll.current = Date.now();

      setDisplayedCardIndex((currentIndex) => {
        return Math.min(maxIndex, Math.max(0, currentIndex + scrollDirection));
      });
    };

    document.addEventListener('wheel', onScroll);

    return () => {
      document.removeEventListener('wheel', onScroll);
    };
  }, [hoveredCard]);

  if (!hoveredCard?.id) return null;

  const currentCard = cardPreviews[displayedCardIndex];

  const cardRotation = hoveredCard ? getCardRotation(hoveredCard) : 0;
  const shouldRotateCard =
    !hasProperty('flipped') && cardRotation && displayedCardIndex === initialIndex;

  const style = {
    '--rotation': `${cardRotation}deg`,
  } as CSSProperties;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <img
          src={currentCard?.src}
          className={classNames(styles.image, {
            [styles.image__rotated]: shouldRotateCard,
            [styles.image__flipped]: currentCard?.flipped,
          })}
          style={style}
        />
        {cardPreviews.length > 1 && currentCard && (
          <div className={styles.scroll_hint}>
            <span>
              <span>
                {displayedCardIndex + 1} / {cardPreviews.length}
              </span>
              <span>{` - ${currentCard.title}`}</span>
            </span>
            <span>scroll to see all</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPreview;
