import React from 'react';

import { LogPayloadSetActivePlayer } from 'backend/constants/logMessages';
import { Divider } from 'antd';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  payload: LogPayloadSetActivePlayer;
}

const MessageSetActivePlayer = ({ payload: { activePlayerId } }: Props) => {
  return (
    <div className={styles.message}>
      <Divider orientation="left" className={styles.divider}>
        {`It's `}
        <ColoredPlayerName id={activePlayerId} addGenetiveSuffix />
        {` turn `}
      </Divider>
    </div>
  );
};

export default MessageSetActivePlayer;
