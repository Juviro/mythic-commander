import React, { useContext, useEffect, useState } from 'react';

import CardPositionContext from 'components/Game/CardPositionContext';
import { getImageUrl } from 'utils/getImageUrl';

import styles from './CardPreview.module.css';

const CardPreview = () => {
  const { hoveredCard } = useContext(CardPositionContext);
  const [displayedCardIndex, setDisplayedCardIndex] = useState(0);

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

  useEffect(() => {
    const newInitialIndex =
      hoveredCard && 'flipped' in hoveredCard && hoveredCard.flipped ? 1 : 0;
    setDisplayedCardIndex(newInitialIndex);
    const onScroll = (e: any) => {
      const scrollDirection = e.deltaY > 0 ? 1 : -1;
      const maxIndex = cardPreviews.length - 1;

      setDisplayedCardIndex((currentIndex) => {
        return Math.min(maxIndex, Math.max(0, currentIndex + scrollDirection));
      });
    };

    document.addEventListener('wheel', onScroll);

    return () => {
      document.removeEventListener('wheel', onScroll);
    };
  }, [hoveredCard]);

  if (!hoveredCard) return null;

  const currentCard = cardPreviews[displayedCardIndex];

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <img src={currentCard?.src} className={styles.image} />
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
