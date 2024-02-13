import React, { ReactNode } from 'react';

import styles from './GameBrowserModal.module.css';

interface Props {
  title: ReactNode;
  headingRight?: ReactNode;
  children: ReactNode;
}

const GameBrowserModal = ({ children, title, headingRight }: Props) => {
  return (
    <div className={styles.browser}>
      <div className={styles.title_wrapper}>
        <h1 className={styles.title}>{title}</h1>
        {headingRight && <span>{headingRight}</span>}
      </div>
      {children}
    </div>
  );
};

export default GameBrowserModal;
