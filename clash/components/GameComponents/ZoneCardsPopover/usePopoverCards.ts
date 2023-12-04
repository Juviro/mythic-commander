import { VisibleCard } from 'backend/database/gamestate.types';
import { DropCard } from 'components/Game/Dropzone/Dropzone';
import GameStateContext from 'components/Game/GameStateContext';
import { useContext, useEffect, useState } from 'react';

const usePopoverCards = () => {
  const { gameState, peekingCards, setPeekingCards } = useContext(GameStateContext);
  const { cards, isSearch } = peekingCards!;
  const [cardsToBottom, setCardsToBottom] = useState<VisibleCard[]>([]);
  const [cardsInLibrary, setCardsInLibrary] = useState(cards);
  const [cardsToTop, setCardsToTop] = useState(isSearch ? [] : cards);

  const onClose = () => {
    setPeekingCards(null);
  };

  useEffect(() => {
    if (cardsToTop.length || cardsToBottom.length || cardsInLibrary.length) return;

    onClose();
  }, [cardsToTop.length, cardsToBottom.length, cardsInLibrary.length]);

  useEffect(() => {
    if (isSearch) {
      setCardsInLibrary(cards);
      setCardsToTop([]);
    } else {
      setCardsInLibrary([]);
      setCardsToTop(cards);
    }
    setCardsToBottom([]);
  }, [cards]);

  const peekedPlayerId = cards[0]?.ownerId;
  const currentCardsInLibrary = gameState?.players.find((p) => p.id === peekedPlayerId)
    ?.zones.library;

  const removeFromAllList = (clashId: string) => {
    if (cardsToBottom.some((c) => c.clashId === clashId)) {
      const newCardsToBottom = cardsToBottom.filter((c) => c.clashId !== clashId);
      setCardsToBottom(newCardsToBottom);
    } else if (cardsToTop.some((c) => c.clashId === clashId)) {
      const newCardsToTop = cardsToTop.filter((c) => c.clashId !== clashId);
      setCardsToTop(newCardsToTop);
    } else if (cardsInLibrary.some((c) => c.clashId === clashId)) {
      const newCardsInLibrary = cardsInLibrary.filter((c) => c.clashId !== clashId);
      setCardsInLibrary(newCardsInLibrary);
    }
  };

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
    if (newCardsToTop.length !== cardsToTop.length) {
      setCardsToTop(newCardsToTop);
    }

    const newCardsToBottom = cardsToBottom.filter((c) =>
      currentCardsInLibrary.some((cc) => cc.clashId === c.clashId)
    );
    if (newCardsToBottom.length !== cardsToBottom.length) {
      setCardsToBottom(newCardsToBottom);
    }

    const newCardsInLibrary = cardsInLibrary.filter((c) =>
      currentCardsInLibrary.some((cc) => cc.clashId === c.clashId)
    );
    if (newCardsInLibrary.length !== cardsInLibrary.length) {
      setCardsInLibrary(newCardsInLibrary);
    }
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
    removeFromAllList(card.clashId);
    setCardsToBottom(newCardsToBottom);
  };

  const onDropTop = (card: DropCard, index: number) => {
    const newCardsToTop = getListWithNewElement(cardsToTop, card, index);
    removeFromAllList(card.clashId);
    setCardsToTop(newCardsToTop);
  };

  const onDropLibrary = (card: DropCard, index: number) => {
    const newCardsInLibrary = getListWithNewElement(cardsInLibrary, card, index);
    removeFromAllList(card.clashId);
    setCardsInLibrary(newCardsInLibrary);
  };

  return {
    cardsToTop,
    cardsToBottom,
    onDropBottom,
    onDropTop,
    cardsInLibrary,
    onDropLibrary,
  };
};

export default usePopoverCards;
