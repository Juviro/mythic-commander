import { useContext } from 'react';

import {
  BattlefieldCard,
  Player,
  VisibleBattlefieldCard,
  ZONES,
} from 'backend/database/gamestate.types';
import useCardActions from 'components/GameComponents/Card/cardActions/useCardActions';
import BattlefieldSelectionContext from '../BattlefieldSelection/BattlefieldSelectionContext';
import { isCardAutoOrderable } from '../battlefieldActions/useOrganizeLands';

interface Props {
  card: BattlefieldCard;
  player: Player;
  isSelected: boolean;
}

const useBattlefieldCardActions = ({ card, player, isSelected }: Props) => {
  const getIsAutoOrderingDisabled = () => {
    if (!isCardAutoOrderable(card as VisibleBattlefieldCard)) return undefined;

    return 'disableAutoOrdering' in card && card.disableAutoOrdering;
  };

  const { contextMenuItems, tapCards, transformCards } = useCardActions({
    cardIds: [card.clashId],
    battlefieldPlayerId: player.id,
    zone: ZONES.BATTLEFIELD,
    player,
    canTransform: card.transformable,
    canFlip: card.flippable,
    canTurnFaceDown: !card.isToken,
    isFaceDown: card.faceDown,
    isAutoOrderingDisabled: getIsAutoOrderingDisabled(),
    isAutoUntapDisabled: Boolean((card as VisibleBattlefieldCard).disableAutoUntap),
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

  return {
    tapCards,
    transformCards,
    onClick,
    onMouseDown,
    onMouseMove,
    contextMenuItems,
  };
};

export default useBattlefieldCardActions;
