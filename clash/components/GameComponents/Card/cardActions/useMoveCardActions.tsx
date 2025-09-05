import { Input } from 'antd';

import { Player, ZONES, Zone } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';
import MtgIcon from 'components/GameComponents/ClashIcon/ClashIcon';

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
      onMoveCard(cardId, ZONES.BATTLEFIELD, player!.id, {
        position: { x: 50 + index, y: 50 + index },
        faceDown,
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

  const moveCardActions = [
    {
      key: 'battlefield',
      icon: <MtgIcon id="phase_combat" size={16} />,
      label: 'Battlefield',
      hidden: zone === ZONES.BATTLEFIELD,
      onClick: onMoveToBattlefield(false),
    },
    {
      key: 'battlefield-face-down',
      icon: <MtgIcon id="phase_combat" size={16} />,
      label: 'Battlefield (Face Down)',
      hidden: zone === ZONES.BATTLEFIELD,
      onClick: onMoveToBattlefield(true),
    },
    {
      key: 'hand',
      icon: <MtgIcon id="hand" size={16} />,
      label: 'Hand',
      hidden: zone === ZONES.HAND,
      onClick: onMoveToZone(ZONES.HAND),
    },
    {
      key: 'graveyard',
      icon: <MtgIcon id="graveyard" size={16} />,
      label: 'Graveyard',
      hidden: zone === ZONES.GRAVEYARD,
      onClick: onMoveToZone(ZONES.GRAVEYARD),
    },
    {
      key: 'library-top',
      icon: <MtgIcon id="library" size={16} />,
      label: 'Top of Library',
      hidden: zone === ZONES.LIBRARY,
      onClick: onMoveToLibrary(player!.zones.library.length || 0),
    },
    {
      key: 'library-bottom',
      icon: <MtgIcon id="library" size={16} />,
      label: 'Bottom of Library',
      hidden: zone === ZONES.LIBRARY,
      onClick: onMoveToLibrary(0),
    },
    {
      key: 'library-nth',
      icon: <MtgIcon id="library" size={16} />,
      label: 'Nth position of Library',
      hidden: zone === ZONES.LIBRARY,
      children: getCustomLibraryPositionItem(
        onMoveToLibrary,
        player!.zones.library.length
      ),
    },
    {
      key: 'exile',
      icon: <MtgIcon id="exile" size={16} />,
      label: 'Exile',
      hidden: zone === ZONES.EXILE,
      onClick: onMoveToZone(ZONES.EXILE),
    },
  ];

  const displayMoveCardActions = moveCardActions.filter(({ hidden }) => !hidden);

  return displayMoveCardActions;
};

export default useMoveCardActions;
