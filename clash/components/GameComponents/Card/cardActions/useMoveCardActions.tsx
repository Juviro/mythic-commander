import ExileIcon from 'public/assets/icons/exile.svg';
import LibraryIcon from 'public/assets/icons/library.svg';
import GraveyardIcon from 'public/assets/icons/graveyard.svg';
import HandIcon from 'public/assets/icons/hand.svg';
import BattlefieldIcon from 'public/assets/icons/phase_combat.svg';
import ContextMenuIcon from 'components/GameComponents/ContextMenu/ContextMenuIcon';
import { Player, ZONES, Zone } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';
import { Input } from 'antd';

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
  zone?: Zone;
  cardIds: string[];
  player: Player;
}

const useMoveCardActions = ({ zone, cardIds, player }: Props) => {
  const { onMoveCard } = useGameActions();

  const onMoveToZone = (toZone: Zone) => () => {
    cardIds.forEach((cardId) => {
      onMoveCard(cardId, toZone, player!.id);
    });
  };

  const onMoveToBattlefield = (faceDown: boolean) => () => {
    cardIds.forEach((cardId, index) => {
      onMoveCard(
        cardId,
        ZONES.BATTLEFIELD,
        player!.id,
        {
          position: { x: 50 + index, y: 50 + index },
        },
        faceDown
      );
    });
  };

  const onMoveToLibrary = (index: number) => () => {
    cardIds.forEach((cardId) => {
      onMoveCard(cardId, ZONES.LIBRARY, player!.id, {
        index,
      });
    });
  };

  const moveCardActions = [
    {
      key: 'battlefield',
      icon: (
        <ContextMenuIcon>
          <BattlefieldIcon />
        </ContextMenuIcon>
      ),
      label: 'Battlefield',
      hidden: zone === ZONES.BATTLEFIELD,
      onClick: onMoveToBattlefield(false),
    },
    {
      key: 'battlefield-face-down',
      icon: (
        <ContextMenuIcon>
          <BattlefieldIcon />
        </ContextMenuIcon>
      ),
      label: 'Battlefield (Face Down)',
      hidden: zone === ZONES.BATTLEFIELD,
      onClick: onMoveToBattlefield(true),
    },
    {
      key: 'hand',
      icon: (
        <ContextMenuIcon>
          <HandIcon />
        </ContextMenuIcon>
      ),
      label: 'Hand',
      hidden: zone === ZONES.HAND,
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
      hidden: zone === ZONES.GRAVEYARD,
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
      hidden: zone === ZONES.LIBRARY,
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
      hidden: zone === ZONES.LIBRARY,
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
      hidden: zone === ZONES.LIBRARY,
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
      hidden: zone === ZONES.EXILE,
      onClick: onMoveToZone(ZONES.EXILE),
    },
  ];

  const displayMoveCardActions = moveCardActions.filter(({ hidden }) => !hidden);

  return displayMoveCardActions;
};

export default useMoveCardActions;
