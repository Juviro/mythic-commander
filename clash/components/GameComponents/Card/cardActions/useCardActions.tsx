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
  canTransform?: boolean;
  canTurnFaceDown?: boolean;
  canFlip?: boolean;
}

const useCardActions = ({
  cardIds,
  battlefieldPlayerId,
  zone,
  contextMenuTitle,
  player,
  isFaceDown,
  canCopy,
  canTransform,
  canTurnFaceDown,
  canFlip,
}: Props) => {
  const {
    transformCards,
    tapCards,
    titleItem,
    tapItem,
    transformItem,
    moveItem,
    putOntoStack,
    rulesItem,
    revealCardsItem,
  } = useBaseCardActions({
    cardIds,
    battlefieldPlayerId,
    zone,
    contextMenuTitle,
  });

  const { addCounterItem, turnFacDownItem, flipItem, peekItem, copyItem } =
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

  addItem(transformItem, zone !== ZONES.BATTLEFIELD || !canTransform);
  addItem(turnFacDownItem, zone !== ZONES.BATTLEFIELD || !canTurnFaceDown);
  addItem(peekItem, zone !== ZONES.BATTLEFIELD || !isFaceDown || cardIds.length !== 1);
  addItem(flipItem, zone !== ZONES.BATTLEFIELD || !canFlip);
  addItem(addCounterItem, zone !== ZONES.BATTLEFIELD || !battlefieldPlayerId, 'before');
  addItem(copyItem, !canCopy || zone !== ZONES.BATTLEFIELD, 'after');

  addItem(moveItem, zone === ZONES.STACK);
  addItem(putOntoStack, zone === ZONES.STACK || cardIds.length !== 1);

  addItem(revealCardsItem, zone !== ZONES.HAND);
  addItem(handActions, zone !== ZONES.HAND, 'before');
  addItem(
    rulesItem,
    cardIds.length !== 1 || isFaceDown,
    zone === ZONES.STACK ? undefined : 'before'
  );

  const filteredContextMenuItems: MenuProps['items'] = contextMenuItems;

  return {
    tapCards,
    transformCards,
    contextMenuItems: filteredContextMenuItems,
  };
};

export default useCardActions;
