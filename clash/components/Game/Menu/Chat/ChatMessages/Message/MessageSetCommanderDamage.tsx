import React, { useContext } from 'react';

import { LogPayloadSetCommanderDamage } from 'backend/constants/logMessages';
import GameStateContext from 'components/Game/GameStateContext';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadSetCommanderDamage;
}

const MessageSetCommanderDamage = ({ payload, playerId }: Props) => {
  const { gameState } = useContext(GameStateContext);

  if (payload.previousTotal === payload.total) return null;

  const targetPlayer = gameState!.players.find(
    (p) => p.id === payload.forPlayerId
  )!.name!;

  const executingPlayer = gameState!.players.find((p) => p.id === playerId)!.name!;

  const didSetOwnLife = payload.forPlayerId === playerId;

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={payload.forPlayerId} name={targetPlayer} addGenetiveSuffix />
      <div>
        <span>
          {` commander damage from `}
          <b>{payload.commanderName}</b>
          {` was set from `}
          <b>{payload.previousTotal}</b>
          {` to `}
          <b>{payload.total}</b>
          {!didSetOwnLife && (
            <>
              {` by `}
              <ColoredPlayerName id={playerId} name={executingPlayer} />
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default MessageSetCommanderDamage;
