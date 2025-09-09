import { useContext } from 'react';
import { Input, MenuProps } from 'antd';
import {
  ArrowRightOutlined,
  EyeOutlined,
  GroupOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { Player, ZONES } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import useMoveCardActions from 'components/GameComponents/Card/cardActions/useMoveCardActions';
import SHORTCUTS from 'constants/shortcuts';
import useShortcut from 'hooks/useShortcut';
import { pluralizeCards } from 'utils/i18nUtils';
import ClashIcon from 'components/GameComponents/ClashIcon/ClashIcon';
import { ItemType } from 'antd/es/menu/interface';

export const getPeekSubItems = (
  onClick: (amount: number) => void,
  key: string,
  getLabel = (index: number) => `...top ${pluralizeCards(index + 1)}`,
  count = 10
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
  const { peekingCards } = useContext(GameStateContext);
  const {
    onPeek,
    onMill,
    onMoveCard,
    onSearchLibrary,
    onPlayTopLibraryCardFaceDown,
    onShuffle,
    onDrawCard,
    onRevealCards,
    onSetPlayWithTopCardRevealed,
  } = useGameActions();

  const cardIds = player.zones.library.map((card) => card.clashId);

  const isSelf = player.id === self!.id;

  const revealCards = () => {
    onRevealCards({
      zone: ZONES.LIBRARY,
    });
  };

  const onExileTopCard = (amount: number) => {
    const cardsToExile = player.zones.library.slice(-amount);
    cardsToExile.forEach((card, index) => {
      onMoveCard(card.clashId, ZONES.EXILE, player.id, {
        skipUpdate: index !== amount - 1,
      });
    });
  };

  useShortcut(SHORTCUTS.DRAW, onDrawCard, { disabled: !isSelf });
  // legacy support - search used to have a shift modifier
  useShortcut(SHORTCUTS.SEARCH, () => onSearchLibrary(player.id), {
    disabled: !isSelf,
    modifierKeys: ['shift'],
  });
  useShortcut(SHORTCUTS.SEARCH, () => onSearchLibrary(player.id), {
    disabled: !isSelf,
  });
  useShortcut(SHORTCUTS.REVEAL_CARDS, revealCards, { disabled: !isSelf });
  useShortcut(SHORTCUTS.MILL_CARD, () => onMill(player.id, 1), {
    disabled: !isSelf,
  });
  useShortcut(SHORTCUTS.EXILE_TOP_CARD, () => onExileTopCard(1), {
    disabled: !isSelf,
  });

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

  const isPeeking = peekingCards?.zone === ZONES.LIBRARY;

  const items: MenuProps['items'] = [
    {
      key: 'search',
      label: 'Search Library... [S]',
      disabled: !player.zones.library.length || isPeeking,
      onClick: () => onSearchLibrary(player.id),
      icon: <SearchOutlined />,
    },
  ];

  if (isSelf) {
    items.push(
      {
        key: 'play-face-down',
        label: 'Play top card face down',
        disabled: !player.zones.library.length,
        onClick: () =>
          onPlayTopLibraryCardFaceDown({
            playerId: player.id,
          }),
        icon: <ClashIcon id="flip" size={16} />,
      },
      {
        key: 'reveal',
        label: 'Reveal cards... [R]',
        disabled: !player.zones.library.length || isPeeking,
        onClick: revealCards,
        icon: <GroupOutlined />,
      },
      {
        key: 'play-with-top-revealed',
        label: player.playWithTopCardRevealed
          ? 'Stop playing with top card revealed'
          : 'Play with top card revealed',
        disabled: !player.zones.library.length,
        onClick: () =>
          onSetPlayWithTopCardRevealed({
            revealed: !player.playWithTopCardRevealed,
          }),
        icon: <EyeOutlined />,
      }
    );
  }

  items.push({
    key: 'peek',
    label: 'Look at...',
    disabled: !player.zones.library.length || isPeeking,
    children: getPeekSubItems(
      onPeekCards,
      'peek',
      undefined,
      player.zones.library.length
    ),
    icon: <EyeOutlined />,
  });

  if (isSelf) {
    const primaryActions = [
      {
        key: 'draw',
        label: 'Draw Card [D]',
        disabled: !player.zones.library.length,
        onClick: onDrawCard,
        icon: <ClashIcon id="draw" size={16} />,
      },
      {
        key: 'shuffle',
        label: 'Shuffle',
        disabled: !player.zones.library.length,
        onClick: onShuffle,
        icon: <ClashIcon id="shuffle" size={16} />,
      },
    ];
    items.unshift(...primaryActions);

    const secondaryActions = [
      {
        key: 'mill',
        label: `Mill cards... [${SHORTCUTS.MILL_CARD.toUpperCase()}]`,
        disabled: !player.zones.library.length,
        children: getPeekSubItems(
          onMillCards,
          'mill',
          undefined,
          player.zones.library.length
        ),
        icon: <ClashIcon id="graveyard" size={16} />,
      },
      {
        key: 'exile-top-card',
        label: `Exile top card... [${SHORTCUTS.EXILE_TOP_CARD.toUpperCase()}]`,
        disabled: !player.zones.library.length,
        children: getPeekSubItems(
          onExileTopCard,
          'exile-top-card',
          undefined,
          player.zones.library.length
        ),
        icon: <ClashIcon id="exile" size={16} />,
      },
      {
        key: 'move',
        label: 'Move all cards to...',
        disabled: !player.zones.library.length,
        children: moveCardActions,
        icon: <ArrowRightOutlined />,
      },
    ];
    items.push(...secondaryActions);
  }

  return {
    items,
  };
};

export default useLibraryActions;
