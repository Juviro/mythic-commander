import React from 'react';

import { Player } from 'backend/database/gamestate.types';
import ExileImage from 'public/assets/icons/exile.svg';

import Dropzone, { DropCard } from 'components/Game/Dropzone/Dropzone';
import { useDrop } from 'react-dnd';
import useGameActions from 'components/Game/useGameActions';
import Card from 'components/GameComponents/Card/Card';
import styles from './Exile.module.css';

interface Props {
  player: Player;
  isSelf?: boolean;
}

const Exile = ({ player, isSelf }: Props) => {
  const { onMoveCard } = useGameActions();

  const [{ canDrop }] = useDrop({
    accept: 'CARD',
    canDrop: ({ ownerId }: DropCard) => {
      return ownerId === player.id;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const onDrop = (card: DropCard) => {
    onMoveCard(card.clashId, 'exile', player.id);
  };

  const cards = player.zones.exile;
  const hasCards = cards.length > 0;

  if (!hasCards && (!isSelf || !canDrop)) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Dropzone onDrop={onDrop} acceptFromPlayerId={player.id} disabled={!isSelf}>
        <div className={styles.inner}>
          <ExileImage />
          {cards.map((card) => (
            <div key={card.clashId} className={styles.card}>
              <Card card={card} dynamicSize zone="exile" />
            </div>
          ))}
        </div>
      </Dropzone>
    </div>
  );
};

export default Exile;
