import { Player } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';
import MtgIcon from 'components/GameComponents/ClashIcon/ClashIcon';

const useHandCardActions = (player: Player) => {
  const { onDiscardRandomCard } = useGameActions();

  const handActions = {
    key: 'parent',
    label: 'Hand Actions',
    icon: <MtgIcon id="hand" size={16} />,
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
        icon: <MtgIcon id="random_card" size={16} />,
      },
    ],
  };

  return {
    handActions,
  };
};

export default useHandCardActions;
