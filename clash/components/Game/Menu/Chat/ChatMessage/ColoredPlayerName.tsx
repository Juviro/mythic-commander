import { Player } from 'backend/database/gamestate.types';

const ColoredPlayerName = ({ id, name }: Partial<Player>) => {
  const style = { color: `var(--color-player-${id})` };
  return <b style={style}>{name}</b>;
};

export default ColoredPlayerName;
