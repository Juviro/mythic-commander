import React, { PropsWithChildren } from 'react';

import styles from './ContextMenuIcon.module.css';

const ContextMenuIcon = ({ children }: PropsWithChildren) => {
  return <div className={styles.icon}>{children}</div>;
};

export default ContextMenuIcon;
