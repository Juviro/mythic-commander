import React, { ReactNode } from 'react';

import { Empty } from 'antd';
import styles from './GameSelection.module.css';

interface Game {
  id: string;
  name: ReactNode;
  description?: ReactNode;
}

interface Props {
  onJoinGame: (lobbyId: string) => void;
  games?: Game[];
  emptyText?: ReactNode;
}

const GamesList = ({ onJoinGame, games, emptyText }: Props) => {
  if (!games?.length) {
    return (
      <div className={styles.empty}>
        <Empty description={emptyText} />
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {games.map(({ id, name, description }) => (
        <li className={styles.list_item} key={id}>
          <button
            type="button"
            onClick={() => onJoinGame(id)}
            className={styles.list_button}
          >
            <span>{name}</span>
            <span>{description}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default GamesList;
