import React, { useContext } from 'react';
import { MessageOutlined } from '@ant-design/icons';

import GameStateContext from 'components/Game/GameStateContext';
import ColoredPlayerName, {
  getColorVariable,
} from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  message: string;
}

const MessageChat = ({ message, playerId }: Props) => {
  const { playerNames } = useContext(GameStateContext);

  return (
    <div className={styles.message}>
      <MessageOutlined style={{ color: getColorVariable(playerId) }} />
      <ColoredPlayerName id={playerId} name={`${playerNames[playerId]}: `} />
      <span>{message}</span>
    </div>
  );
};

export default MessageChat;
