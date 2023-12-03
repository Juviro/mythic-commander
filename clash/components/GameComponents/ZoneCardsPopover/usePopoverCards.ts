import { VisibleCard } from 'backend/database/gamestate.types';
import { DropCard } from 'components/Game/Dropzone/Dropzone';
import GameStateContext from 'components/Game/GameStateContext';
import { useContext, useEffect, useState } from 'react';

const usePopoverCards = (cards: VisibleCard[]) => {
  const { gameState, setPeekingCards } = useContext(GameStateContext);
  const [cardsToTop, setCardsToTop] = useState(cards);
  const [cardsToBottom, setCardsToBottom] = useState<VisibleCard[]>([]);

  const onClose = () => {
    setPeekingCards(null);
  };

  useEffect(() => {
    if (cardsToTop.length || cardsToBottom.length) return;

    onClose();
  }, [cardsToTop.length, cardsToBottom.length]);

  useEffect(() => {
    setCardsToTop(cards);
    setCardsToBottom([]);
  }, [cards]);

  const peekedPlayerId = cards[0]?.ownerId;
  const currentCardsInLibrary = gameState?.players.find((p) => p.id === peekedPlayerId)
    ?.zones.library;

  // Check if cards are still in library
  useEffect(() => {
    if (!currentCardsInLibrary) return;

    const shouldRemoveFromCards = cards.some(
      ({ clashId }) => !currentCardsInLibrary.some((c) => c.clashId === clashId)
    );
    if (!shouldRemoveFromCards) {
      return;
    }

    const newCardsToTop = cardsToTop.filter((c) =>
      currentCardsInLibrary.some((cc) => cc.clashId === c.clashId)
    );
    setCardsToTop(newCardsToTop);

    const newCardsToBottom = cardsToBottom.filter((c) =>
      currentCardsInLibrary.some((cc) => cc.clashId === c.clashId)
    );
    setCardsToBottom(newCardsToBottom);
  }, [currentCardsInLibrary]);

  const getListWithNewElement = (list: VisibleCard[], card: DropCard, index: number) => {
    const newCard = cards.find((c) => c.clashId === card?.clashId);
    if (!card || !newCard) return [];

    const newCards = list.filter((c) => c.clashId !== card.clashId);

    const currentIndex = list.findIndex((c) => c.clashId === card.clashId);

    if (currentIndex !== -1 && currentIndex + 1 <= index) {
      newCards.splice(index - 1, 0, newCard);
    } else {
      newCards.splice(index, 0, newCard);
    }
    return newCards;
  };

  const onDropBottom = (card: DropCard, index: number) => {
    const newCardsToBottom = getListWithNewElement(cardsToBottom, card, index);
    setCardsToBottom(newCardsToBottom);

    if (cardsToTop.some((c) => c.clashId === card.clashId)) {
      const newCardsToTop = cardsToTop.filter((c) => c.clashId !== card.clashId);
      setCardsToTop(newCardsToTop);
    }
  };

  const onDropTop = (card: DropCard, index: number) => {
    const newCardsToTop = getListWithNewElement(cardsToTop, card, index);
    setCardsToTop(newCardsToTop);

    if (cardsToBottom.some((c) => c.clashId === card.clashId)) {
      const newCardsToBottom = cardsToBottom.filter((c) => c.clashId !== card.clashId);
      setCardsToBottom(newCardsToBottom);
    }
  };

  return {
    cardsToTop,
    cardsToBottom,
    onDropBottom,
    onDropTop,
  };
};

export default usePopoverCards;
