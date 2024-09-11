import React, { CSSProperties, useContext, useEffect, useRef, useState } from 'react';

import CardPositionContext from 'components/Game/CardPositionContext';
import { getImageUrl } from 'utils/getImageUrl';

import classNames from 'classnames';
import styles from './CardPreview.module.css';

const SCROLL_DELAY = 500;

const CardPreview = () => {
  const { hoveredCard } = useContext(CardPositionContext);
  const [displayedCardIndex, setDisplayedCardIndex] = useState(0);
  const lastScroll = useRef(0);

  const cardPreviews = hoveredCard?.id
    ? [
        {
          src: getImageUrl(hoveredCard.id),
          title: 'Front',
        },
      ]
    : [];

  if (hoveredCard?.flippable) {
    cardPreviews.push({
      src: getImageUrl(hoveredCard.id, true),
      title: 'Back',
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

  // Only rotate the card if we view the face that's on the battlefield
  const initialIndex =
    hoveredCard && 'flipped' in hoveredCard && hoveredCard.flipped ? 1 : 0;

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

  const cardRotation = ('rotateDeg' in hoveredCard && hoveredCard.rotateDeg) ?? 0;
  const shouldRotateCard = cardRotation && displayedCardIndex === initialIndex;
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
