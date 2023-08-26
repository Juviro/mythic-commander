import React, { ReactNode } from 'react';

import styles from './GameBrowserModal.module.css';

interface Props {
  title: ReactNode;
  children: ReactNode;
}

const GameBrowserModal = ({ children, title }: Props) => {
  return (
    <div className={styles.browser}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
};

export default GameBrowserModal;
