import { useState } from 'react';
import { ProxyCard } from '../../../types/graphql';

const useProxyCards = () => {
  const [cards, setCards] = useState<ProxyCard[]>([]);

  const onSetAmount = (cardId: string, amount: number) => {
    const newAmount = Math.max(1, amount);
    setCards(
      cards?.map((card) => (card.id === cardId ? { ...card, amount: newAmount } : card))
    );
  };

  const onRemoveCard = (cardId: string) => {
    setCards(cards?.filter((card) => card.id !== cardId));
  };

  const onAddCards = (card: ProxyCard[]) => {
    if (!cards) return;

    const cardIndex = cards.findIndex((c) => c.id === card[0].id);
    if (cardIndex === -1) {
      setCards([...card, ...cards]);
    } else {
      const newCards = cards.map((c) => ({
        ...c,
        amount: c.id === card[0].id ? c.amount + 1 : c.amount,
      }));
      setCards(newCards);
    }
  };

  return {
    cards,
    setCards,
    onSetAmount,
    onRemoveCard,
    onAddCards,
  };
};

export default useProxyCards;
