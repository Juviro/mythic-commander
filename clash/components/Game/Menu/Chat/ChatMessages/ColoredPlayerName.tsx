import { Player } from 'backend/database/gamestate.types';

export const getColorVariable = (id: string) => {
  return `var(--color-player-${id})`;
};

const ColoredPlayerName = ({ id, name }: Partial<Player>) => {
  const style = { color: getColorVariable(id!) };
  return <b style={style}>{name}</b>;
};

export default ColoredPlayerName;
