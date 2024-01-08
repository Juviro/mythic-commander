import { ZONES, Zone } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import { useContext } from 'react';

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

  const onMoveToHand = () => {
    cardIds.forEach((cardId) => {
      onMoveCard(cardId, ZONES.HAND, player!.id);
    });
  };

  const contextMenuItems = [
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
        // {
        //   key: 'battlefield',
        //   label: 'Battlefield',
        //   hidden: zone === 'battlefield',
        //   onClick: () => {
        //     console.log('move to battlefield');
        //   },
        // },
        {
          key: 'hand',
          label: 'Hand',
          hidden: zone === 'hand',
          onClick: onMoveToHand,
        },
        // {
        //   key: 'graveyard',
        //   label: 'Graveyard',
        //   hidden: zone === 'graveyard',
        //   onClick: () => {
        //     console.log('move to graveyard');
        //   },
        // },
        // {
        //   key: 'library',
        //   label: 'Library...',
        //   children: [
        //     {
        //       key: 'top',
        //       label: 'Top of Library',
        //       onClick: () => {
        //         console.log('move to library');
        //       },
        //     },
        //     {
        //       key: 'bottom',
        //       label: 'Bottom of Library',
        //       onClick: () => {
        //         console.log('move to library');
        //       },
        //     },
        //     {
        //       key: 'nth',
        //       label: 'Nth position of Library',
        //       onClick: () => {
        //         console.log('move to library');
        //       },
        //     },
        //   ],
        // },
      ],
    },
  ];

  const filteredContextMenuItems = contextMenuItems
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
