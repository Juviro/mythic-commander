import { ArrowRightOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Player, ZONES } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import useMoveCardActions from 'components/GameComponents/Card/cardActions/useMoveCardActions';
import { useContext } from 'react';

interface Props {
  cardIds: string[];
  player: Player;
}

const useGraveyardActions = ({ cardIds, player }: Props) => {
  const { player: self } = useContext(GameStateContext);
  const moveCardActions = useMoveCardActions({
    cardIds,
    player,
    zone: ZONES.GRAVEYARD,
  });

  const isSelf = player.id === self!.id;

  if (!isSelf) return [];

  const graveyardActions: MenuProps['items'] = [
    {
      key: 'move to',
      label: 'Move all cards to...',
      disabled: !cardIds.length,
      children: moveCardActions,
      icon: <ArrowRightOutlined />,
    },
  ];

  return graveyardActions;
};

export default useGraveyardActions;
