import { Input, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Player, ZONES } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import useMoveCardActions from 'components/GameComponents/Card/cardActions/useMoveCardActions';
import { useContext } from 'react';
import { pluralizeCards } from 'utils/i18nUtils';

export const getPeekSubItems = (
  onClick: (amount: number) => void,
  count: number,
  key: string,
  getLabel = (index: number) => `...top ${pluralizeCards(index + 1)}`
) => {
  const maxPeekCount = Math.min(count, 10);

  const items: ItemType[] = new Array(maxPeekCount).fill(0).map((_, index) => {
    const label = getLabel(index);

    return {
      key: `${key}-${index}`,
      label,
      onClick: () => onClick(index + 1),
    };
  });

  if (count > 10) {
    items.push({
      type: 'divider',
    });
    items.push({
      key: `${key}-custom`,
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
  const { onPeek, onMill, onSearchLibrary, onShuffle } = useGameActions();

  const cardIds = player.zones.library.map((card) => card.clashId);

  const moveCardActions = useMoveCardActions({
    cardIds,
    player,
    zone: ZONES.BATTLEFIELD,
  });

  const onPeekCards = (amount: number) => {
    onPeek(player.id, 'library', amount);
  };
  const onMillCards = (amount: number) => {
    onMill(player.id, amount);
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
      children: getPeekSubItems(onPeekCards, player.zones.library.length, 'peek'),
    },
    {
      key: 'mill',
      label: 'Mill cards...',
      disabled: !player.zones.library.length,
      children: getPeekSubItems(onMillCards, player.zones.library.length, 'mill'),
    },
    {
      key: 'move',
      label: 'Move all cards to...',
      disabled: !player.zones.library.length,
      children: moveCardActions,
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
