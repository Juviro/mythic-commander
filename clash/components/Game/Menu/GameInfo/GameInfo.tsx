import React, { useContext } from 'react';
import { Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import GameStateContext from 'components/Game/GameStateContext';
import useGameInfoActions from './useGameInfoActions';

import styles from './GameInfo.module.css';

const GameInfo = () => {
  const { gameState } = useContext(GameStateContext);

  const { items } = useGameInfoActions();

  return (
    <div className={styles.wrapper}>
      <div>{`Turn ${gameState?.turn}`}</div>
      {Boolean(items.length) && (
        <Dropdown menu={{ items }} trigger={['click']}>
          <MenuOutlined className={styles.menu_icon} />
        </Dropdown>
      )}
    </div>
  );
};

export default GameInfo;
