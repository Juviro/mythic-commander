import React from 'react';
import ColoredPlayerName from 'components/GameComponents/ColoredPlayerName/ColoredPlayerName';
import { LogPayloadUndo } from 'backend/constants/logMessages';

import { pluralize } from 'utils/i18nUtils';
import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadUndo;
}

const MessageUndo = ({ playerId, payload }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        {' undid the last '}
        <b>{pluralize(payload.numberOfUndos, 'action', 'actions', '')}</b>
      </span>
    </div>
  );
};

export default MessageUndo;
