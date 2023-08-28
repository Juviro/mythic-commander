import React from 'react';

import { Player } from 'backend/database/gamestate.types';
import styles from './Battlefield.module.css';

interface Props {
  player: Player;
}

const Battlefield = ({ player }: Props) => {
  return <div className={`${styles.wrapper} battlefield`}>BATTLEFIELD</div>;
};

export default Battlefield;
