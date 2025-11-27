import React, { CSSProperties, useContext } from 'react';
import { Divider, Tooltip } from 'antd';

import { Player } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import { getImageUrl } from 'utils/getImageUrl';
import useGameActions from 'components/Game/useGameActions';
import PlusMinus from 'components/lib/PlusMinus/PlusMinus';

import styles from './LifeTotals.module.css';

interface Props {
  player: Player;
}

const CommanderDamage = ({ player }: Props) => {
  const { gameState, getPlayerColor } = useContext(GameStateContext);

  const { setCommanderDamage } = useGameActions();

  const commanderDamage = gameState!.players
    .flatMap((p) => {
      return p.commanders.map((commander) => {
        return {
          player: p,
          commander,
          damage: commander.commanderDamageDealt[player.id] || 0,
        };
      });
    })
    .filter(({ player: p }) => p.id !== player.id);

  if (!commanderDamage.length) {
    return null;
  }

  return (
    <div className={styles.commander_damage}>
      <span className={styles.commander_damage__title}>Commander Damage</span>
      {commanderDamage.map(({ player: p, commander, damage }) => (
        <div
          key={commander.clashId}
          className={styles.commander_damage__row}
          style={
            {
              '--player-color': getPlayerColor(p.id),
            } as CSSProperties
          }
        >
          <Tooltip title={commander.name} classNames={{ root: styles.tooltip }}>
            <img
              className={styles.commander_damage__img}
              src={getImageUrl(commander.id, false, 'art_crop')}
              alt=""
            />
          </Tooltip>
          <div className={styles.commander_damage__buttons}>
            <PlusMinus
              amount={damage}
              onChange={(delta) => () => {
                setCommanderDamage(damage + delta, commander.clashId, player.id);
              }}
              alwaysShowButtons
            />
          </div>
        </div>
      ))}
      <Divider style={{ margin: '8px 0 0' }} />
    </div>
  );
};

export default CommanderDamage;
