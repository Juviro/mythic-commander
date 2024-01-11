import { MenuProps } from 'antd';
import { Player } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';

const useHandCardActions = (player: Player) => {
  const { onDiscardRandomCard } = useGameActions();

  const handActions: MenuProps['items'] = [
    {
      type: 'divider',
    },
    {
      key: 'parent',
      label: 'Hand Actions',
      style: {
        backgroundColor: 'white',
        cursor: 'default',
      },
      children: [
        {
          key: 'discard-random',
          label: 'Discard random card',
          disabled: player.zones.hand.length === 0,
          onClick: () => onDiscardRandomCard(player.id),
        },
      ],
    },
  ];

  return {
    handActions,
  };
};

export default useHandCardActions;
