import { BattlefieldCard, Player, ZONES } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';
import SHORTCUTS from 'constants/shortcuts';
import useShortcut from 'hooks/useShortcut';
import { RefObject } from 'react';
import useBattlefieldCardActions from './useBattlefieldCardActions';

interface Props {
  card: BattlefieldCard;
  player: Player;
  selectedCardIds?: string[];
  cardRef: RefObject<HTMLDivElement>;
}

const useBattlefieldShortcuts = ({ card, player, selectedCardIds, cardRef }: Props) => {
  const { onMoveCard, copyCard } = useGameActions();
  const { tapCards, transformCards } = useBattlefieldCardActions({
    card,
    player,
    // hardcoded because it is not used for the functions we are calling
    isSelected: false,
  });

  const onMoveCardToGraveyard = () => {
    onMoveCard(card.clashId, ZONES.GRAVEYARD, player.id);
  };
  useShortcut(SHORTCUTS.DELETE, onMoveCardToGraveyard, {
    disabled: Boolean(selectedCardIds?.length),
    whenHovering: cardRef,
  });

  useShortcut(SHORTCUTS.TAP, tapCards, {
    disabled: Boolean(selectedCardIds?.length),
    whenHovering: cardRef,
  });

  useShortcut(SHORTCUTS.TRANSFORM, transformCards, {
    disabled: Boolean(selectedCardIds?.length),
    whenHovering: cardRef,
  });

  const onCopyCard = () => {
    copyCard({
      clashId: card.clashId,
      amount: 1,
      battlefieldPlayerId: player.id,
    });
  };

  useShortcut(SHORTCUTS.COPY, onCopyCard, {
    disabled: Boolean(selectedCardIds?.length),
    whenHovering: cardRef,
  });
};

export default useBattlefieldShortcuts;
