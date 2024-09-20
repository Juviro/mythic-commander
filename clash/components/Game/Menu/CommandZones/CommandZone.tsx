import React, { CSSProperties } from 'react';
import classNames from 'classnames';

import { Player, ZONES } from 'backend/database/gamestate.types';
import Card from 'components/GameComponents/Card/Card';
import useGameActions from 'components/Game/useGameActions';

import { DropCard } from 'types/dnd.types';
import Dropzone from 'components/GameComponents/Dropzone/Dropzone';
import CommanderCasted from './CommanderCasted';

import styles from './CommandZones.module.css';
import PlayerName from './PlayerName';

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
              <div
                key={commander.clashId}
                className={classNames(styles.card, {
                  [styles.card__resigned]: player.resigned,
                })}
              >
                <CommanderCasted commander={commander} isSelf={isSelf} />
                {card && (
                  <Card
                    card={card}
                    draggable={isSelf && !player.resigned}
                    dynamicSize
                    zone={ZONES.COMMAND_ZONE}
                  />
                )}
              </div>
            );
          })}
        </Dropzone>
      </div>
      <PlayerName player={player} />
    </div>
  );
};

export default CommandZone;
