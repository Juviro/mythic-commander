import React from 'react';

import { MANA_SYMBOLS } from 'components/Game/GameOverlays/FloatingMana/FloatingManaSymbols';

import styles from './DecksList.module.css';

interface Props {
  colorIdentity?: string[];
}

const ColorIdentity = ({ colorIdentity }: Props) => {
  const colorIdentityWithFallback = colorIdentity?.length ? colorIdentity : ['c'];

  return (
    <div className={styles.mana_icons}>
      {colorIdentityWithFallback.map((color) => (
        <div key={color} className={styles.mana_icon}>
          {MANA_SYMBOLS.find((symbol) => symbol.key === color.toLowerCase())?.icon}
        </div>
      ))}
    </div>
  );
};

export default ColorIdentity;
