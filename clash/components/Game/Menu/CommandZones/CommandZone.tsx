import React, { CSSProperties } from 'react';

import { Player, ZONES } from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';
import Dropzone, { DropCard } from 'components/Game/Dropzone/Dropzone';
import useGameActions from 'components/Game/useGameActions';

import styles from './CommandZones.module.css';

interface Props {
  player: Player;
  isSelf: boolean;
}

const CommandZone = ({ player, isSelf }: Props) => {
  const { onMoveCard } = useGameActions();

  const onDrop = ({ clashId }: DropCard) => {
    onMoveCard(clashId, ZONES.COMMAND_ZONE, player.id);
  };

  const acceptedIds = isSelf ? player.commanders.map(({ clashId }) => clashId) : [];

  return (
    <div
      className={styles.command_zone}
      style={{ '--player-color': player.color } as CSSProperties}
    >
      <Dropzone onDrop={onDrop} acceptedIds={acceptedIds}>
        {player.zones.commandZone.map((card) => (
          <div key={card.clashId} className={styles.card}>
            <Card card={card} draggable={isSelf} dynamicSize zone={ZONES.COMMAND_ZONE} />
          </div>
        ))}
      </Dropzone>
    </div>
  );
};

export default CommandZone;
