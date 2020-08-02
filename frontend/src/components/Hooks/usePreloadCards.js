import { useEffect } from 'react';
import { getImageUrl } from '../../utils/cardImage';

export default (cards, firstCard, cardsPerPage) => {
  const numberOfCards = cards.length;

  useEffect(() => {
    const nextPageCards = cards.slice(
      firstCard + cardsPerPage,
      firstCard + 2 * cardsPerPage
    );
    nextPageCards.forEach(({ id, imgKey }) => {
      const img = new Image();
      img.src = getImageUrl(id, imgKey, 'normal');
    });
    // eslint-disable-next-line
  }, [firstCard, cardsPerPage, numberOfCards]);
};
