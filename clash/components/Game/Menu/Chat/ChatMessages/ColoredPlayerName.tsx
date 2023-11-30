import { Player } from 'backend/database/gamestate.types';
import { CSSProperties } from 'react';

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

  const style: CSSProperties = { color: getColorVariable(id!), whiteSpace: 'nowrap' };

  return <b style={style}>{getName()}</b>;
};

export default ColoredPlayerName;
