import React, { CSSProperties } from 'react';

import { Player, ZONES } from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';
import Dropzone, { DropCard } from 'components/Game/Dropzone/Dropzone';
import useGameActions from 'components/Game/useGameActions';

import styles from './CommandZones.module.css';
import ColoredPlayerName from '../Chat/ChatMessages/ColoredPlayerName';

interface Props {
  player: Player;
  isSelf: boolean;
}

const CommandZone = ({ player, isSelf }: Props) => {
  const { onMoveCard } = useGameActions();

  const onDrop = ({ clashId }: DropCard) => {
    onMoveCard(clashId, ZONES.COMMAND_ZONE, player.id);
  };

  const acceptedIds = player.commanders.map(({ clashId }) => clashId);

  return (
    <div
      className={styles.command_zone}
      style={{ '--player-color': player.color } as CSSProperties}
    >
      <div className={styles.command_zone_card}>
        <Dropzone onDrop={onDrop} acceptedIds={acceptedIds}>
          {player.zones.commandZone.map((card) => (
            <div key={card.clashId} className={styles.card}>
              <Card
                card={card}
                enlargeOnHover
                draggable={isSelf}
                dynamicSize
                zone={ZONES.COMMAND_ZONE}
              />
            </div>
          ))}
        </Dropzone>
      </div>
      <ColoredPlayerName id={player.id} name={player.name} />
    </div>
  );
};

export default CommandZone;
