import { MenuProps } from 'antd';
import { Player, ZONES } from 'backend/database/gamestate.types';
import useMoveCardActions from 'components/GameComponents/Card/cardActions/useMoveCardActions';

interface Props {
  cardIds: string[];
  player: Player;
}

const useGraveyardActions = ({ cardIds, player }: Props) => {
  const moveCardActions = useMoveCardActions({
    cardIds,
    player,
    zone: ZONES.GRAVEYARD,
  });

  const graveyardActions: MenuProps['items'] = [
    {
      key: 'move to',
      label: 'Move all cards to...',
      disabled: !cardIds.length,
      children: moveCardActions,
    },
  ];

  return graveyardActions;
};

export default useGraveyardActions;