import React, { CSSProperties, useContext, useEffect } from 'react';

import useCombatStore from 'store/combatStore';
import useCombatArrows from './useCombatArrows';
import CombatArrow from './CombatArrow';
import GameStateContext from '../GameStateContext';

const CombatArrows = () => {
  const { attackers } = useCombatArrows();
  const { gameState } = useContext(GameStateContext);
  const selectedAttackerIds = useCombatStore((store) => store.selectedAttackerIds);
  const resetSelectedAttackerIds = useCombatStore(
    (store) => store.resetSelectedAttackerIds
  );

  useEffect(() => {
    if (!selectedAttackerIds.length) return;
    resetSelectedAttackerIds();
  }, [gameState?.phase]);

  const activePlayer = gameState?.players.find(
    (player) => player.id === gameState.activePlayerId
  );
  const style = {
    '--attack-arrow-color': activePlayer?.color,
  } as CSSProperties;

  return (
    <div style={style}>
      {attackers.map(({ from, id, to, isTemporary }) => (
        <CombatArrow key={id} from={from} to={to} isTemporary={isTemporary} />
      ))}
    </div>
  );
};

export default CombatArrows;
