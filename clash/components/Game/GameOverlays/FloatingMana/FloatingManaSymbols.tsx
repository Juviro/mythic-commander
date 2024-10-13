import React from 'react';

import ManaWhiteIcon from 'public/assets/mtgicons/w_colored.svg';
import ManaBlueIcon from 'public/assets/mtgicons/u_colored.svg';
import ManaBlackIcon from 'public/assets/mtgicons/b_colored.svg';
import ManaRedIcon from 'public/assets/mtgicons/r_colored.svg';
import ManaGreenIcon from 'public/assets/mtgicons/g_colored.svg';
import ManaColorlessIcon from 'public/assets/mtgicons/c_colored.svg';

import { FloatingManaValues } from 'backend/database/gamestate.types';
import PlusMinus from 'components/lib/PlusMinus/PlusMinus';

import useGameActions from 'components/Game/useGameActions';
import styles from './FloatingMana.module.css';

export const MANA_SYMBOLS = [
  {
    key: 'w',
    icon: <ManaWhiteIcon />,
  },
  {
    key: 'u',
    icon: <ManaBlueIcon />,
  },
  {
    key: 'b',
    icon: <ManaBlackIcon />,
  },
  {
    key: 'r',
    icon: <ManaRedIcon />,
  },
  {
    key: 'g',
    icon: <ManaGreenIcon />,
  },
  {
    key: 'c',
    icon: <ManaColorlessIcon />,
  },
] as const;

interface Props {
  floatingMana: FloatingManaValues;
  canEdit: boolean;
}

const FloatingManaSymbols = ({ canEdit, floatingMana }: Props) => {
  const { trackFloatingMana } = useGameActions();
  const onChange = (key: keyof FloatingManaValues) => (delta: number) => () => {
    const newAmount = Math.max((floatingMana?.[key] || 0) + delta, 0);

    trackFloatingMana({
      mana: {
        [key]: newAmount,
      },
    });
  };

  return (
    <div className={styles.floating_mana}>
      {MANA_SYMBOLS.map(({ key, icon }) => (
        <div key={key} className={styles.mana}>
          {icon}
          <div className={styles.buttons}>
            <PlusMinus
              amount={floatingMana?.[key] || 0}
              onChange={onChange(key)}
              hideButtons={!canEdit}
              size="small"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingManaSymbols;
