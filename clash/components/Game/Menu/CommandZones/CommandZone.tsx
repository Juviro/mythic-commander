import React, { CSSProperties } from 'react';

import { Player, ZONES } from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';
import Dropzone, { DropCard } from 'components/Game/Dropzone/Dropzone';
import useGameActions from 'components/Game/useGameActions';

import classNames from 'classnames';
import styles from './CommandZones.module.css';
import ColoredPlayerName from '../Chat/ChatMessages/ColoredPlayerName';
import CommanderCasted from './CommanderCasted';

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
      className={classNames(styles.command_zone, {
        [styles.command_zone__partners]: player.commanders.length > 1,
      })}
      style={{ '--player-color': player.color } as CSSProperties}
    >
      <div className={styles.command_zone_card}>
        <Dropzone onDrop={onDrop} acceptedIds={acceptedIds}>
          {player.commanders.map((commander) => {
            const card = player.zones.commandZone.find(
              ({ clashId }) => commander.clashId === clashId
            );
            return (
              <div key={commander.clashId} className={styles.card}>
                <CommanderCasted commander={commander} />
                {card && (
                  <Card
                    card={card}
                    enlargeOnHover
                    draggable={isSelf}
                    dynamicSize
                    zone={ZONES.COMMAND_ZONE}
                  />
                )}
              </div>
            );
          })}
        </Dropzone>
      </div>
      <div className={styles.player_name}>
        <ColoredPlayerName id={player.id} name={player.name} />
      </div>
    </div>
  );
};

export default CommandZone;
