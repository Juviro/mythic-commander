import React from 'react';

import { Player } from 'backend/database/gamestate.types';

import useCombatStore from 'store/combatStore';
import styles from './PlayerName.module.css';

export const getPlayerNameId = (playerId: string) => `player-name-${playerId}`;

interface Props {
  player: Player;
  isSelf?: boolean;
}

const PlayerName = ({ player, isSelf }: Props) => {
  const selectedAttackerIds = useCombatStore((store) => store.selectedAttackerIds);
  const attackTarget = useCombatStore((store) => store.attackTarget);
  const attacks = useCombatStore((store) => store.attackers);

  const isBeeingAttacked = attacks.some((attack) => attack.targetId === player.id);

  if (!isBeeingAttacked && (isSelf || !selectedAttackerIds.length)) {
    return null;
  }

  return (
    <div
      className={styles.wrapper}
      id={getPlayerNameId(player.id)}
      onClick={() => attackTarget(player.id, 'player')}
    >{`Attack ${player.name}`}</div>
  );
};

export default PlayerName;
