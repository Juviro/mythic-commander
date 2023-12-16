import { Input, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Player } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import { pluralizeCards } from 'components/Game/Menu/Chat/ChatMessages/util';
import useGameActions from 'components/Game/useGameActions';
import { useContext } from 'react';

const getPeekSubItems = (onClick: (amount: number) => void, count: number) => {
  const maxPeekCount = Math.min(count, 10);

  const items: ItemType[] = new Array(maxPeekCount).fill(0).map((_, index) => {
    const label = `...top ${pluralizeCards(index + 1)}`;

    return {
      key: `peek-${index}`,
      label,
      onClick: () => onClick(index + 1),
    };
  });

  if (count > 10) {
    items.push({
      type: 'divider',
    });
    items.push({
      key: 'peek-custom',
      label: (
        <Input
          placeholder="Custom amount..."
          type="number"
          onPressEnter={(e) => {
            onClick(Math.min(Number(e.currentTarget.value), count));
          }}
          min={1}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    });
  }

  return items;
};

const useLibraryActions = (player: Player) => {
  const { player: self } = useContext(GameStateContext);
  const { onPeek, onSearchLibrary, onShuffle } = useGameActions();
  const onPeekCard = (amount: number) => {
    onPeek(player.id, 'library', amount);
  };

  const isSelf = player.id === self!.id;

  const items: MenuProps['items'] = [
    {
      key: 'search',
      label: 'Search Library...',
      disabled: !player.zones.library.length,
      onClick: () => onSearchLibrary(player.id),
    },
    {
      key: 'peek',
      label: 'Look at...',
      disabled: !player.zones.library.length,
      children: getPeekSubItems(onPeekCard, player.zones.library.length),
    },
  ];

  if (isSelf) {
    items.unshift({
      key: 'shuffle',
      label: 'Shuffle',
      disabled: !player.zones.library.length,
      onClick: onShuffle,
    });
  }

  return {
    items,
  };
};

export default useLibraryActions;
