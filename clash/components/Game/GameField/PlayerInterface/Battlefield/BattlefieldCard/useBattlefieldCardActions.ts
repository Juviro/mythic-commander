import { useContext } from 'react';

import { BattlefieldCard, Player, ZONES } from 'backend/database/gamestate.types';
import useCardActions from 'components/GameComponents/Card/cardActions/useCardActions';
import BattlefieldSelectionContext from '../BattlefieldSelection/BattlefieldSelectionContext';

interface Props {
  card: BattlefieldCard;
  player: Player;
  isSelected: boolean;
}

const useBattlefieldCardActions = ({ card, player, isSelected }: Props) => {
  const { contextMenuItems, tapCards, flipCards } = useCardActions({
    cardIds: [card.clashId],
    battlefieldPlayerId: player.id,
    zone: ZONES.BATTLEFIELD,
  });

  const { toggleCardSelection } = useContext(BattlefieldSelectionContext);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey) {
      toggleCardSelection(card.clashId);
    } else {
      tapCards();
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) return;
    e.preventDefault();
    e.stopPropagation();
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelected) return;
    e.stopPropagation();
  };

  return {
    tapCards,
    flipCards,
    onClick,
    onMouseDown,
    onMouseMove,
    contextMenuItems,
  };
};

export default useBattlefieldCardActions;
