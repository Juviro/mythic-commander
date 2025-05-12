import React from 'react';

import { LogPayloadPlaneswalk } from 'backend/constants/logMessages';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadPlaneswalk;
}

const MessagePlaneswalk = ({ playerId, payload }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span> planeswalked to</span>
      <b>{payload.newPlaneName}</b>
    </div>
  );
};

export default MessagePlaneswalk;
