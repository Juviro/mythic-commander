import { MenuProps } from 'antd';
import { Player } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';

const getSubItems = (
  key: string,
  label: string,
  count: number,
  onClick: (amount: number) => void
) => {
  return new Array(count).fill(0).map((_, index) => ({
    key: `${key}-${index}`,
    label: `${label.replace('{{X}}', `${index + 1}`)}`,
    onClick: () => onClick(index + 1),
  }));
};

const useLibraryActions = (player: Player) => {
  const { onPeek } = useGameActions();
  const onPeekCard = (amount: number) => {
    onPeek(player.id, 'library', amount);
  };

  const items: MenuProps['items'] = [
    // {
    //   key: 'shuffle',
    //   label: 'Shuffle',
    // },
    {
      key: 'peek',
      label: 'Look at...',
      children: getSubItems('peek', '...top {{X}} cards', 10, onPeekCard),
    },
  ];

  return {
    items,
  };
};

export default useLibraryActions;
