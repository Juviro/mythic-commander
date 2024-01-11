import { useContext } from 'react';
import { Input, MenuProps } from 'antd';

import { ZONES, Zone } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import ContextMenuIcon from 'components/GameComponents/ContextMenu/ContextMenuIcon';

import ExileIcon from 'public/assets/icons/exile.svg';
import LibraryIcon from 'public/assets/icons/library.svg';
import GraveyardIcon from 'public/assets/icons/graveyard.svg';
import HandIcon from 'public/assets/icons/hand.svg';
import BattlefieldIcon from 'public/assets/icons/phase_combat.svg';

const getCustomLibraryPositionItem = (
  onMoveToLibrary: (index: number) => () => void,
  numberOfCardsInLibrary: number
) => {
  return [
    {
      key: 'nth-library-position',
      label: (
        <Input
          placeholder="Position from top"
          type="number"
          onPressEnter={(e) => {
            const newPosition = Math.min(
              Math.max(Number(e.currentTarget.value), 0),
              numberOfCardsInLibrary + 1
            );
            onMoveToLibrary(numberOfCardsInLibrary - newPosition + 1)();
          }}
          min={1}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
  ];
};
interface Props {
  cardIds: string[];
  battlefieldPlayerId?: string;
  hiddenActionKeys?: string[];
  zone?: Zone;
}

const useGetCardActions = ({
  cardIds,
  battlefieldPlayerId,
  hiddenActionKeys,
  zone,
}: Props) => {
  const { player } = useContext(GameStateContext);
  const { onTapCards, onFlipCards, onMoveCard } = useGameActions();

  const flipCards = () => {
    if (!battlefieldPlayerId) return;
    onFlipCards({
      cardIds,
      battlefieldPlayerId,
    });
  };

  const tapCards = () => {
    if (!battlefieldPlayerId) return;
    onTapCards({
      cardIds,
      battlefieldPlayerId,
    });
  };

  const onMoveToZone = (toZone: Zone) => () => {
    cardIds.forEach((cardId) => {
      onMoveCard(cardId, toZone, player!.id);
    });
  };

  const onMoveToBattlefield = () => {
    cardIds.forEach((cardId, index) => {
      onMoveCard(cardId, ZONES.BATTLEFIELD, player!.id, {
        position: { x: 50 + index, y: 50 + index },
      });
    });
  };

  const onMoveToLibrary = (index: number) => () => {
    cardIds.forEach((cardId) => {
      onMoveCard(cardId, ZONES.LIBRARY, player!.id, {
        index,
      });
    });
  };

  const contextMenuItems = [
    {
      key: 'title',
      label: `${cardIds.length} cards selected`,
      hidden: cardIds.length <= 1,
      style: {
        backgroundColor: 'white',
        cursor: 'default',
      },
    },
    {
      type: 'divider' as const,
      hidden: cardIds.length <= 1,
    },
    {
      key: 'tap',
      label: 'Tap [T]',
      hidden: !battlefieldPlayerId,
      onClick: tapCards,
    },
    {
      key: 'flip',
      label: 'Flip [F]',
      hidden: !battlefieldPlayerId,
      onClick: flipCards,
    },
    {
      key: 'move',
      label: 'Move to...',
      children: [
        {
          key: 'battlefield',
          icon: (
            <ContextMenuIcon>
              <BattlefieldIcon />
            </ContextMenuIcon>
          ),
          label: 'Battlefield',
          hidden: zone === 'battlefield',
          onClick: onMoveToBattlefield,
        },
        {
          key: 'hand',
          icon: (
            <ContextMenuIcon>
              <HandIcon />
            </ContextMenuIcon>
          ),
          label: 'Hand',
          hidden: zone === 'hand',
          onClick: onMoveToZone(ZONES.HAND),
        },
        {
          key: 'graveyard',
          icon: (
            <ContextMenuIcon>
              <GraveyardIcon />
            </ContextMenuIcon>
          ),
          label: 'Graveyard',
          hidden: zone === 'graveyard',
          onClick: onMoveToZone(ZONES.GRAVEYARD),
        },
        {
          key: 'library-top',
          icon: (
            <ContextMenuIcon>
              <LibraryIcon />
            </ContextMenuIcon>
          ),
          label: 'Top of Library',
          onClick: onMoveToLibrary(player!.zones.library.length || 0),
        },
        {
          key: 'library-bottom',
          icon: (
            <ContextMenuIcon>
              <LibraryIcon />
            </ContextMenuIcon>
          ),
          label: 'Bottom of Library',
          onClick: onMoveToLibrary(0),
        },
        {
          key: 'library-nth',
          icon: (
            <ContextMenuIcon>
              <LibraryIcon />
            </ContextMenuIcon>
          ),
          label: 'Nth position of Library',
          children: getCustomLibraryPositionItem(
            onMoveToLibrary,
            player!.zones.library.length
          ),
        },
        {
          key: 'exile',
          icon: (
            <ContextMenuIcon>
              <ExileIcon />
            </ContextMenuIcon>
          ),
          label: 'Exile',
          hidden: zone === 'exile',
          onClick: onMoveToZone(ZONES.EXILE),
        },
      ],
    },
  ];

  const filteredContextMenuItems: MenuProps['items'] = contextMenuItems
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => !child?.hidden),
    }))
    .filter((item) => !item.hidden && !hiddenActionKeys?.includes(item.key as string));

  return {
    tapCards,
    flipCards,
    contextMenuItems: filteredContextMenuItems,
  };
};

export default useGetCardActions;
