import React, { useContext } from 'react';

import { LogPayloadSetPhase } from 'backend/constants/logMessages';
import GameStateContext from 'components/Game/GameStateContext';
import { Phase } from 'backend/database/gamestate.types';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  payload: LogPayloadSetPhase;
}

export const getPhaseName = (phase: Phase) => {
  switch (phase) {
    case 'beginning':
      return 'Beginning';
    case 'main1':
      return 'Pre-combat main';
    case 'main2':
      return 'Post-combat main';
    case 'combat':
      return 'Combat';
    case 'end':
      return 'Ending';
    default:
      return '';
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
