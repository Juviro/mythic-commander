import React, { useContext } from 'react';

import { LogPayloadSetPlayerLife } from 'backend/constants/logMessages';
import GameStateContext from 'components/Game/GameStateContext';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadSetPlayerLife;
}

const MessageSetLife = ({ payload, playerId }: Props) => {
  const { gameState } = useContext(GameStateContext);

  const targetPlayer = gameState!.players.find((p) => p.id === payload.forPlayerId)!
    .name!;

  const didSetOwnLife = payload.forPlayerId === playerId;

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <div>
        <span>
          {` set `}
          {didSetOwnLife ? (
            `their`
          ) : (
            <ColoredPlayerName
              id={payload.forPlayerId}
              name={targetPlayer}
              addGenetiveSuffix
            />
          )}
          {` life from `}
          <b>{payload.previousTotal}</b>
          {` to `}
          <b>{payload.total}</b>
        </span>
      </div>
    </div>
  );
};

export default MessageSetLife;
