import { CSSProperties, useContext } from 'react';

import GameStateContext from 'components/Game/GameStateContext';

export const getColorVariable = (id: string) => {
  return `var(--color-player-${id})`;
};

type Props = {
  addGenetiveSuffix?: boolean;
  id: string;
  name?: string;
  isSelf?: boolean;
};

const ColoredPlayerName = ({
  id,
  addGenetiveSuffix,
  name: providedName,
  isSelf,
}: Props) => {
  const { playerNames } = useContext(GameStateContext);
  const name = providedName || playerNames[id!];

  const getName = () => {
    if (isSelf && addGenetiveSuffix) {
      return 'Your';
    }
    if (isSelf) {
      return 'You';
    }

    if (!addGenetiveSuffix) {
      return name;
    }
    if (name.endsWith('s')) {
      return `${name}'`;
    }
    return `${name}'s`;
  };

  const style: CSSProperties = {
    color: getColorVariable(id),
    whiteSpace: 'nowrap',
  };

  return <b style={style}>{getName()}</b>;
};

export default ColoredPlayerName;
