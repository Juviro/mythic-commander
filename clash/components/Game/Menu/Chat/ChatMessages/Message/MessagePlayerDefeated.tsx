import React from 'react';
import classNames from 'classnames';

import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
}

const MessagePlayerDefeated = ({ playerId }: Props) => {
  return (
    <div className={classNames(styles.message, styles.message__important)}>
      <ColoredPlayerName id={playerId} />
      <span>resigned</span>
    </div>
  );
};

export default MessagePlayerDefeated;
