import React from 'react';

import { Commander } from 'backend/database/gamestate.types';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './CommandZones.module.css';

interface Props {
  commander: Commander;
}

const CommanderCasted = ({ commander }: Props) => {
  const commanderShortName = commander.name.split(',')[0];

  return (
    <div className={styles.commander_casted}>
      <div>{`${commanderShortName} Tax`}</div>
      <div className={styles.commander_casted_buttons}>
        <MinusOutlined className={styles.commander_casted_button} />
        <span>{commander.timesCasted}</span>
        <PlusOutlined className={styles.commander_casted_button} />
      </div>
    </div>
  );
};

export default CommanderCasted;
