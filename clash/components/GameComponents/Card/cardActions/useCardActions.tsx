import { ReactNode } from 'react';
import { MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/interface';

import { Player, Zone, ZONES } from 'backend/database/gamestate.types';

import useHandCardActions from './useHandCardActions';
import useBaseCardActions from './useBaseCardActions';
import useBattlefieldCardActions from './useBattlefieldCardActions';

interface Props {
  cardIds: string[];
  zone: Zone;
  player: Player;

  battlefieldPlayerId?: string;
  contextMenuTitle?: ReactNode;
  canCopy?: boolean;
  isFaceDown?: boolean;
  canFlip?: boolean;
  canTurnFaceDown?: boolean;
}

const useCardActions = ({
  cardIds,
  battlefieldPlayerId,
  zone,
  contextMenuTitle,
  player,
  isFaceDown,
  canCopy,
  canFlip,
  canTurnFaceDown,
}: Props) => {
  const {
    flipCards,
    tapCards,
    titleItem,
    tapItem,
    flipItem,
    moveItem,
    // rulesItem
  } = useBaseCardActions({
    cardIds,
    battlefieldPlayerId,
    zone,
    contextMenuTitle,
  });

  const { addCounterItem, turnFacDownItem, rotateItem, peekItem, copyItem } =
    useBattlefieldCardActions({
      cardIds,
      player,
      isFaceDown,
    });
  const { handActions } = useHandCardActions(player!);

  const hideTitle = cardIds.length <= 1 && !contextMenuTitle;

  const contextMenuItems: MenuProps['items'] = [];

  const addDivider = () => {
    contextMenuItems.push({
      type: 'divider',
    });
  };

  const addItem = (
    item: ItemType,
    hidden?: boolean,
    dividerPosition?: 'before' | 'after'
  ) => {
    if (hidden) return;
    if (dividerPosition === 'before') addDivider();
    contextMenuItems.push(item);
    if (dividerPosition === 'after') addDivider();
  };

  addItem(titleItem, hideTitle, 'after');
  addItem(tapItem, zone !== ZONES.BATTLEFIELD);

  addItem(flipItem, zone !== ZONES.BATTLEFIELD || !canFlip);
  addItem(turnFacDownItem, zone !== ZONES.BATTLEFIELD || !canTurnFaceDown);
  addItem(peekItem, zone !== ZONES.BATTLEFIELD || !isFaceDown || cardIds.length !== 1);
  addItem(rotateItem, zone !== ZONES.BATTLEFIELD);
  addItem(addCounterItem, zone !== ZONES.BATTLEFIELD || !battlefieldPlayerId, 'before');
  addItem(copyItem, !canCopy || zone !== ZONES.BATTLEFIELD, 'after');

  addItem(moveItem, false);

  addItem(handActions, zone !== ZONES.HAND, 'before');
  // addItem(rulesItem, cardIds.length !== 1, 'before');

  // TODO: hide children if necessary
  const filteredContextMenuItems: MenuProps['items'] = contextMenuItems;

  return {
    tapCards,
    flipCards,
    contextMenuItems: filteredContextMenuItems,
  };
};

export default useCardActions;
