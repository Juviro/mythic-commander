import React from 'react';

import { PHASES } from 'backend/database/gamestate.types';
import styles from './Phases.module.css';
import PhaseIcon from './PhaseIcon';

const PhaseIcons = () => {
  return (
    <div className={styles.phase_icons}>
      {PHASES.map((phase) => (
        <PhaseIcon key={phase} phase={phase} />
      ))}
    </div>
  );
};

export default PhaseIcons;
