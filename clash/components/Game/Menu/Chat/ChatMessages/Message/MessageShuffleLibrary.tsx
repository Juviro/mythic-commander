import React from 'react';

import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
}

const MessageShuffleLibrary = ({ playerId }: Props) => {
  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        <b>{' shuffled '}</b>
        their library
      </span>
    </div>
  );
};

export default MessageShuffleLibrary;
