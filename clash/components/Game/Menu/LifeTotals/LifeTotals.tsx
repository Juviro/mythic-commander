import React, { useContext } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';

import { Player } from 'backend/database/gamestate.types';
import useShortcut from 'hooks/useShortcut';
import SHORTCUTS from 'constants/shortcuts';
import styles from './LifeTotals.module.css';
import LifeTotal from './LifeTotal';

const LifeTotals = () => {
  const { gameState, player: self } = useContext(GameStateContext);

  const { setPlayerLife } = useGameActions();

  const onChangeLife = (player: Player, lifeDelta: number) => () => {
    setPlayerLife(player.id, player.life + lifeDelta);
  };

  useShortcut(SHORTCUTS.MINUS, () => onChangeLife(self!, -1)());
  useShortcut(SHORTCUTS.PLUS, () => onChangeLife(self!, 1)());
  // For german Mac keyboards, the + key is actually Shift + 1
  useShortcut(SHORTCUTS.PLUS, () => onChangeLife(self!, 1)(), {
    modifierKeys: ['shift'],
  });

  return (
    <div className={styles.wrapper}>
      {gameState?.players.map((player) => (
        <div key={player.id} className={styles.player}>
          <LifeTotal player={player} onChangeLife={onChangeLife} />
        </div>
      ))}
    </div>
  );
};

export default LifeTotals;
