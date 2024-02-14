import React from 'react';

import { Commander } from 'backend/database/gamestate.types';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import useGameActions from 'components/Game/useGameActions';
import styles from './CommandZones.module.css';

interface Props {
  commander: Commander;
  isSelf?: boolean;
}

const CommanderCasted = ({ commander, isSelf }: Props) => {
  const { onSetCommanderTimesCasted } = useGameActions();
  const commanderShortName = commander.name.split(',')[0];

  return (
    <div className={styles.commander_casted}>
      <div className={styles.commander_tax}>{`${commanderShortName} Tax`}</div>
      <div className={styles.commander_casted_buttons}>
        {isSelf && (
          <MinusOutlined
            className={styles.commander_casted_button}
            onClick={() =>
              onSetCommanderTimesCasted(commander.clashId, commander.timesCasted - 2)
            }
          />
        )}
        <span>{commander.timesCasted}</span>
        {isSelf && (
          <PlusOutlined
            className={styles.commander_casted_button}
            onClick={() =>
              onSetCommanderTimesCasted(commander.clashId, commander.timesCasted + 2)
            }
          />
        )}
      </div>
    </div>
  );
};

export default CommanderCasted;
