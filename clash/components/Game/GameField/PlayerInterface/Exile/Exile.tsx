import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

import { Player, ZONES } from 'backend/database/gamestate.types';
import ExileImage from 'public/assets/icons/exile.svg';
import useGameActions from 'components/Game/useGameActions';
import Card from 'components/GameComponents/Card/Card';
import { DndItemTypes, DropCard, DropCardGroup } from 'types/dnd.types';
import ContextMenu from 'components/GameComponents/ContextMenu/ContextMenu';
import CardListModal from 'components/GameComponents/CardListModal/CardListModal';
import Dropzone from 'components/GameComponents/Dropzone/Dropzone';
import useExileActions from './useExileActions';

import styles from './Exile.module.css';

interface Props {
  player: Player;
}

const Exile = ({ player }: Props) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { onMoveCard } = useGameActions();

  const [{ canDrop }] = useDrop({
    accept: [DndItemTypes.CARD, DndItemTypes.LIST_CARD, DndItemTypes.CARD_GROUP],
    canDrop: (dropElement: DropCard | DropCardGroup) => {
      if ('cardIds' in dropElement) {
        return true;
      }
      return dropElement.ownerId === player.id;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const exileActions = useExileActions({
    player,
    cardIds: player.zones.exile.map(({ clashId }) => clashId),
  });

  const onDrop = (dropElement: DropCard | DropCardGroup) => {
    if ('cardIds' in dropElement) {
      dropElement.cardIds.forEach((clashId) =>
        onMoveCard(clashId, ZONES.EXILE, player.id)
      );
      return;
    }
    onMoveCard(dropElement.clashId, ZONES.EXILE, player.id);
  };

  const cards = player.zones.exile;
  const hasCards = cards.length > 0;

  if (!hasCards && !canDrop) {
    // it's important to always render something,
    // otherwise chrome will crash for some reason
    return <div />;
  }

  return (
    <ContextMenu items={exileActions}>
      <div className={styles.wrapper}>
        <CardListModal
          player={player}
          title="Exile"
          cards={cards}
          element={elementRef?.current}
          zone={ZONES.GRAVEYARD}
          resetPosition
        />
        <Dropzone
          onDrop={onDrop}
          acceptFromPlayerId={player.id}
          accept={[DndItemTypes.CARD, DndItemTypes.LIST_CARD, DndItemTypes.CARD_GROUP]}
        >
          <div className={styles.inner} ref={elementRef}>
            <ExileImage />
            {cards.map((card) => (
              <div key={card.clashId} className={styles.card}>
                <Card card={card} dynamicSize zone="exile" />
              </div>
            ))}
          </div>
        </Dropzone>
      </div>
    </ContextMenu>
  );
};

export default Exile;
