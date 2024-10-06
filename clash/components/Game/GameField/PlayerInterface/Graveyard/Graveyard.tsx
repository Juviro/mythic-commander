import React, { useRef } from 'react';

import { Player, ZONES } from 'backend/database/gamestate.types';
import GraveyardImage from 'public/assets/icons/graveyard.svg';
import useGameActions from 'components/Game/useGameActions';
import { DndItemTypes, DropCard, DropCardGroup } from 'types/dnd.types';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';
import CardListModal from 'components/GameComponents/CardListModal/CardListModal';
import Dropzone from 'components/GameComponents/Dropzone/Dropzone';
import CardStack from '../CardStack/CardStack';
import useGraveyardActions from './useGraveyardActions';

import styles from './Graveyard.module.css';

const MAX_DISPLAYED_CARDS = 10;

interface Props {
  player: Player;
}

const Graveyard = ({ player }: Props) => {
  const { onMoveCard } = useGameActions();
  const { graveyard } = player.zones;
  const elementRef = useRef<HTMLDivElement>(null);

  const cards = graveyard.slice(-MAX_DISPLAYED_CARDS);

  const onDrop = (dropElement: DropCard | DropCardGroup) => {
    if ('cardIds' in dropElement) {
      dropElement.cardIds.forEach((clashId) =>
        onMoveCard(clashId, ZONES.GRAVEYARD, player.id)
      );
      return;
    }
    onMoveCard(dropElement.clashId, ZONES.GRAVEYARD, player.id);
  };

  const graveyardActions = useGraveyardActions({
    player,
    cardIds: graveyard.map(({ clashId }) => clashId),
  });

  return (
    <ContextMenu items={graveyardActions}>
      <div className={styles.wrapper} ref={elementRef}>
        <CardListModal
          player={player}
          title="Graveyard"
          cards={graveyard}
          element={elementRef?.current}
          zone={ZONES.GRAVEYARD}
          resetPosition
        />
        <Dropzone
          onDrop={onDrop}
          acceptFromPlayerId={player.id}
          accept={[DndItemTypes.CARD, DndItemTypes.LIST_CARD, DndItemTypes.CARD_GROUP]}
        >
          <CardStack
            cards={cards}
            emptyImage={<GraveyardImage />}
            draggable
            zone="graveyard"
          />
        </Dropzone>
      </div>
    </ContextMenu>
  );
};

export default Graveyard;
