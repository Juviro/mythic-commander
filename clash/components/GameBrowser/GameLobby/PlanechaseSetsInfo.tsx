import { Space, Tooltip } from 'antd';
import React from 'react';

import { Lobby } from 'backend/lobby/GameLobby.types';
import styles from './GameLobby.module.css';

const MAX_SETS_TO_SHOW = 2;

interface PlanechaseSetsInfoProps {
  lobby?: Lobby;
}

const PlanechaseSetsInfo = ({ lobby }: PlanechaseSetsInfoProps) => {
  if (!lobby?.planechaseSets?.length) return null;

  const hasTooManySets = lobby.planechaseSets.length > MAX_SETS_TO_SHOW + 1;

  return (
    <Space className={styles.planechase_sets}>
      <span className={styles.planechase_sets_label}>Planechase: </span>
      {lobby.planechaseSets
        .slice(0, hasTooManySets ? MAX_SETS_TO_SHOW : lobby.planechaseSets.length)
        .map((set) => set.setName)
        .join(', ')}
      {hasTooManySets && (
        <Tooltip
          title={
            <Space direction="vertical" size={0}>
              {lobby.planechaseSets.slice(MAX_SETS_TO_SHOW).map((set) => (
                <div key={set.setName}>{set.setName}</div>
              ))}
            </Space>
          }
        >
          <span className={styles.planechase_more_and}>and </span>
          <span className={styles.planechase_more_sets}>
            {lobby.planechaseSets.length - MAX_SETS_TO_SHOW} more
          </span>
        </Tooltip>
      )}
    </Space>
  );
};

export default PlanechaseSetsInfo;
