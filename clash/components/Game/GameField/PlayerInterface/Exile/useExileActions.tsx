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

const useExileActions = ({ cardIds, player }: Props) => {
  const { player: self } = useContext(GameStateContext);
  const moveCardActions = useMoveCardActions({
    cardIds,
    player,
    zone: ZONES.EXILE,
  });

  const isSelf = player.id === self!.id;

  if (!isSelf) return [];

  const exileActions: MenuProps['items'] = [
    {
      key: 'move to',
      label: 'Move all cards to...',
      disabled: !cardIds.length,
      children: moveCardActions,
      icon: <ArrowRightOutlined />,
    },
  ];

  return exileActions;
};

export default useExileActions;
