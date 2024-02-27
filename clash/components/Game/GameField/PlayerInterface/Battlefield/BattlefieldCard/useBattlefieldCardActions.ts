import { useContext } from 'react';

import { BattlefieldCard, Player, ZONES } from 'backend/database/gamestate.types';
import useCardActions from 'components/GameComponents/Card/cardActions/useCardActions';
import BattlefieldSelectionContext from '../BattlefieldSelection/BattlefieldSelectionContext';
import useBattlefieldOnlyCardActions from './useBattlefieldOnlyCardActions';

interface Props {
  card: BattlefieldCard;
  player: Player;
  isSelected: boolean;
}

const useBattlefieldCardActions = ({ card, player, isSelected }: Props) => {
  const hiddenActionKeys: string[] = [];
  if (!card.flippable) {
    hiddenActionKeys.push('flip');
  }

  const {
    contextMenuItems: baseContextMenuitems,
    tapCards,
    flipCards,
  } = useCardActions({
    cardIds: [card.clashId],
    battlefieldPlayerId: player.id,
    zone: ZONES.BATTLEFIELD,
    hiddenActionKeys,
  });

  const additionalBattlefieldContextMenuItems = useBattlefieldOnlyCardActions({
    cardIds: [card.clashId],
    player,
    canTurnFaceDown: !card.isToken,
    isFaceDown: card.faceDown,
    canCopy: !card.faceDown,
  });

  const { toggleCardSelection } = useContext(BattlefieldSelectionContext);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey) {
      toggleCardSelection(card.clashId);
    } else {
      tapCards();
    }
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) return;
    e.preventDefault();
    e.stopPropagation();
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelected) return;
    e.stopPropagation();
  };

  const contextMenuItems = [
    ...baseContextMenuitems,
    ...additionalBattlefieldContextMenuItems,
  ];

  const moveIntoFirstBlock = (key: string) => {
    const turnFaceDownCardActionIndex = contextMenuItems.findIndex(
      (item) => item?.key === key
    );

    if (turnFaceDownCardActionIndex === -1) return;
    const firstDividerIndex = contextMenuItems.findIndex((item) => !item?.key);

    // insert before the first divider
    contextMenuItems.splice(
      firstDividerIndex,
      0,
      contextMenuItems.splice(turnFaceDownCardActionIndex, 1)[0]
    );
  };

  moveIntoFirstBlock('turn-face-down');
  moveIntoFirstBlock('peek-face-down');

  return {
    tapCards,
    flipCards,
    onClick,
    onMouseDown,
    onMouseMove,
    contextMenuItems,
  };
};

export default useBattlefieldCardActions;
