import React from 'react';

import styles from './Menu.module.css';
import Chat from './Chat/Chat';

const Menu = () => {
  return (
    <div className={styles.wrapper}>
      <Chat />
    </div>
  );
};

export default Menu;
