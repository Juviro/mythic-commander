import { useContext, useEffect } from 'react';
import BattlefieldSelectionContext from './BattlefieldSelectionContext';

const useSelection = (
  wrapperRef: React.RefObject<HTMLDivElement>,
  rectRef: React.RefObject<HTMLDivElement>
) => {
  const { setHoveredCardIds } = useContext(BattlefieldSelectionContext);

  const cardsOnBattlefield = wrapperRef.current?.querySelectorAll(`.battlefield_card`);

  // calculate which card intersects with the rect
  const cardsIdsInRect = Array.from(cardsOnBattlefield || [])
    .filter((card) => {
      if (!rectRef.current) return false;
      const cardRect = card.getBoundingClientRect();
      const rectRect = rectRef.current.getBoundingClientRect();
      return (
        cardRect.x < rectRect.x + rectRect.width &&
        cardRect.x + cardRect.width > rectRect.x &&
        cardRect.y < rectRect.y + rectRect.height &&
        cardRect.y + cardRect.height > rectRect.y
      );
    })
    .map((card) => card.getAttribute('data-card-id')!);

  useEffect(() => {
    setHoveredCardIds(cardsIdsInRect);

    return () => {
      setHoveredCardIds([]);
    };
  }, [cardsIdsInRect.length]);
};

export default useSelection;
