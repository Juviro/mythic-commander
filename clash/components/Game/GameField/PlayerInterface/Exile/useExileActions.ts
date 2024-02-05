import { MenuProps } from 'antd';
import { Player, ZONES } from 'backend/database/gamestate.types';
import useMoveCardActions from 'components/GameComponents/Card/cardActions/useMoveCardActions';

interface Props {
  cardIds: string[];
  player: Player;
}

const useExileActions = ({ cardIds, player }: Props) => {
  const moveCardActions = useMoveCardActions({
    cardIds,
    player,
    zone: ZONES.EXILE,
  });

  const exileActions: MenuProps['items'] = [
    {
      key: 'move to',
      label: 'Move all cards to...',
      disabled: !cardIds.length,
      children: moveCardActions,
    },
  ];

  return exileActions;
};

export default useExileActions;