import { ReactNode, useContext } from 'react';
import { MenuProps } from 'antd';

import { Zone } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';

import useMoveCardActions from './useMoveCardActions';

interface Props {
  cardIds: string[];
  battlefieldPlayerId?: string;
  hiddenActionKeys?: string[];
  zone?: Zone;
  contextMenuTitle?: ReactNode;
}

const useCardActions = ({
  cardIds,
  battlefieldPlayerId,
  hiddenActionKeys,
  zone,
  contextMenuTitle,
}: Props) => {
  const { player } = useContext(GameStateContext);
  const { onTapCards, onFlipCards } = useGameActions();
  const moveCardActions = useMoveCardActions({
    zone,
    cardIds,
    player: player!,
  });

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

  const hideTitle = cardIds.length <= 1 && !contextMenuTitle;

  const contextMenuItems = [
    {
      key: 'title',
      label: contextMenuTitle || `${cardIds.length} cards selected`,
      hidden: hideTitle,
      style: {
        backgroundColor: 'white',
        cursor: 'default',
      },
    },
    {
      type: 'divider' as const,
      hidden: hideTitle,
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
      type: 'divider' as const,
      hidden: !battlefieldPlayerId,
    },
    {
      key: 'move',
      label: `Move ${cardIds.length === 1 ? 'card' : 'all cards'} to...`,
      children: moveCardActions,
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

export default useCardActions;
