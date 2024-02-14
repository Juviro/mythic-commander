import { Player, VisibleCard } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';
import { useEffect, useState } from 'react';
import { DropCard } from 'types/dnd.types';

interface Props {
  player: Player;
}

const useMulligan = ({ player }: Props) => {
  const cards = player.zones.hand as VisibleCard[];

  const [toHand, setToHand] = useState<VisibleCard[]>(cards);
  const [toLibrary, setToLibrary] = useState<VisibleCard[]>([]);
  const [loading, setLoading] = useState(false);

  const { onTakeMulligan: onTakeMulliganAction, onAcceptHand: onAcceptHandAction } =
    useGameActions();

  useEffect(() => {
    setLoading(false);
    setToHand(cards);
    setToLibrary([]);
  }, [cards]);

  const onMoveCard = (to: 'hand' | 'library') => (dropCard: DropCard, index: number) => {
    const card = cards.find((c) => c.clashId === dropCard.clashId)!;

    if (to === 'hand') {
      setToLibrary((prev) => prev.filter((c) => c.clashId !== card.clashId));
      setToHand((prev) => {
        const newCards = prev.filter((c) => c.clashId !== card.clashId);
        newCards.splice(index, 0, card);
        return newCards;
      });
    } else {
      setToHand((prev) => prev.filter((c) => c.clashId !== card.clashId));
      setToLibrary((prev) => {
        const newCards = prev.filter((c) => c.clashId !== card.clashId);
        newCards.splice(index, 0, card);
        return newCards;
      });
    }
  };

  const onTakeMulligan = () => {
    setLoading(true);
    onTakeMulliganAction();
  };

  const onAcceptHand = () => {
    const cardIdsToLibrary = toLibrary.map((c) => c.clashId);
    onAcceptHandAction({ cardIdsToLibrary });
  };

  return {
    toHand,
    toLibrary,
    onMoveCard,
    onTakeMulligan,
    onAcceptHand,
    loading,
  };
};

export default useMulligan;
