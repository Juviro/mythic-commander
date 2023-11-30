import React from 'react';

import styles from './Phases.module.css';
import PhaseIcons from './PhaseIcons';
import PhaseButtons from './PhaseButtons';

const Phases = () => {
  return (
    <div className={styles.wrapper}>
      <PhaseIcons />
      <PhaseButtons />
    </div>
  );
};

export default Phases;
