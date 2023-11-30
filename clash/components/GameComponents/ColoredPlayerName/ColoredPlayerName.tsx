import { CSSProperties } from 'react';

import { Player } from 'backend/database/gamestate.types';

import styles from './ColoredPlayerName.module.css';

export const getColorVariable = (id: string) => {
  return `var(--color-player-${id})`;
};

type Props = {
  addGenetiveSuffix?: boolean;
} & Pick<Player, 'id' | 'name'>;

const ColoredPlayerName = ({ id, name, addGenetiveSuffix }: Props) => {
  const getName = () => {
    if (!addGenetiveSuffix) {
      return name;
    }
    if (name.endsWith('s')) {
      return `${name}'`;
    }
    return `${name}'s`;
  };

  const style: CSSProperties = {
    color: getColorVariable(id!),
  };

  return (
    <b style={style} className={styles.text}>
      {getName()}
    </b>
  );
};

export default ColoredPlayerName;
