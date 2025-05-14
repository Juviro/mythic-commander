import React from 'react';

import styles from './BackgroundFlash.module.css';

interface BackgroundFlashProps {
  active: boolean;
  timestamp: number;
}

const BackgroundFlash = ({ active, timestamp }: BackgroundFlashProps) => {
  if (!active) return null;

  // Make sure that hovering the same cards twice re-plays the animation
  return <div className={styles.flash} key={timestamp} />;
};

export default BackgroundFlash;
