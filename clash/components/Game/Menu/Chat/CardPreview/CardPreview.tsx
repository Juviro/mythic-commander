import React, { useContext, useEffect, useState } from 'react';

import CardPositionContext from 'components/Game/CardPositionContext';
import { getImageUrl } from 'utils/getImageUrl';

import styles from './CardPreview.module.css';

const CardPreview = () => {
  const { hoveredCard } = useContext(CardPositionContext);
  const [displayedCardIndex, setDisplayedCardIndex] = useState(0);

  const cardUrls = hoveredCard ? [getImageUrl(hoveredCard.id)] : [''];

  if (hoveredCard?.flippable) {
    cardUrls.push(getImageUrl(hoveredCard.id, true));
  }

  useEffect(() => {
    setDisplayedCardIndex(0);
    const onScroll = (e: any) => {
      const scrollDirection = e.deltaY > 0 ? 1 : -1;
      const maxIndex = cardUrls.length - 1;
      const newIndex = Math.min(
        maxIndex,
        Math.max(0, displayedCardIndex + scrollDirection)
      );
      setDisplayedCardIndex(newIndex);
    };

    document.addEventListener('wheel', onScroll);

    return () => {
      document.removeEventListener('wheel', onScroll);
    };
  }, [hoveredCard]);

  if (!hoveredCard) return null;

  const currentCardUrl = cardUrls[displayedCardIndex];

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <img src={currentCardUrl} className={styles.image} />
        {cardUrls.length > 1 && (
          <div className={styles.scroll_hint}>
            <span>
              {displayedCardIndex + 1} / {cardUrls.length}
            </span>
            <span>scroll to see all sides</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPreview;
