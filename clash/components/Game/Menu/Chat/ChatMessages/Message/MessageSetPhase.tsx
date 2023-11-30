import React, { useContext } from 'react';

import { LogPayloadSetPhase } from 'backend/constants/logMessages';
import GameStateContext from 'components/Game/GameStateContext';
import { Phase } from 'backend/database/gamestate.types';
import ColoredPlayerName from '../ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  payload: LogPayloadSetPhase;
}

const getPhaseName = (phase: Phase) => {
  switch (phase) {
    case 'beginning':
      return 'Beginning';
    case 'main1':
      return 'Precombat Main';
    case 'main2':
      return 'Postcombat Main';
    case 'combat':
      return 'Combat';
    case 'end':
      return 'End';
    default:
      return 'Unknown';
  }
};

const MessageSetPhase = ({ payload }: Props) => {
  const { activePlayerId, phase } = payload;
  const { playerNames } = useContext(GameStateContext);

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={activePlayerId} name={playerNames[activePlayerId]} />
      {` moved to `}
      <b>{getPhaseName(phase)}</b>
      {` phase`}
    </div>
  );
};

export default MessageSetPhase;
