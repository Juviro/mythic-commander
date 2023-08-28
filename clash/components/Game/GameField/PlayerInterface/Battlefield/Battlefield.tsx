import React from 'react';

import { Player } from 'backend/database/gamestate.types';
import Dropzone from 'components/Game/Dropzone/Dropzone';
import styles from './Battlefield.module.css';

interface Props {
  player: Player;
}

const Battlefield = ({ player }: Props) => {
  return (
    <div className={`${styles.wrapper} battlefield`}>
      <Dropzone onDrop={console.log}>
        <span>BATTLEFIELD</span>
      </Dropzone>
    </div>
  );
};

export default Battlefield;
