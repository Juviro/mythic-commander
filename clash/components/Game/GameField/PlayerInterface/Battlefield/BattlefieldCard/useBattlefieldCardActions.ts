import { MenuProps } from 'antd';
import { BattlefieldCard, Player } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';
import { useContext } from 'react';
import BattlefieldSelectionContext from '../BattlefieldSelection/BattlefieldSelectionContext';

interface Props {
  card: BattlefieldCard;
  player: Player;
  isSelected: boolean;
}

const useBattlefieldCardActions = ({ card, player, isSelected }: Props) => {
  const { onTapCards, onFlipCards } = useGameActions();

  const flipCard = () => {
    onFlipCards({
      cardIds: [card.clashId],
      battlefieldPlayerId: player.id,
    });
  };

  const tapCard = () => {
    onTapCards({
      cardIds: [card.clashId],
      battlefieldPlayerId: player.id,
    });
  };

  const { toggleCardSelection } = useContext(BattlefieldSelectionContext);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey) {
      toggleCardSelection(card.clashId);
    } else {
      tapCard();
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

  const contextMenuItems: MenuProps['items'] = [
    {
      key: 'tap',
      label: card.tapped ? 'Untap' : 'Tap',
      onClick: tapCard,
    },
    {
      key: 'flip',
      label: 'Flip',
      onClick: flipCard,
    },
  ];

  return {
    tapCard,
    onClick,
    onMouseDown,
    onMouseMove,
    contextMenuItems,
  };
};

export default useBattlefieldCardActions;
