import { useContext } from 'react';

import useCombatStore from 'store/combatStore';
import GameStateContext from '../GameStateContext';

const useInfoBoxText = () => {
  const { gameState, player } = useContext(GameStateContext);
  const isDeclaringBlockers = useCombatStore((state) => state.isDeclaringBlockers);
  const setIsDeclaringBlockers = useCombatStore((state) => state.setIsDeclaringBlockers);

  if (!gameState) return null;

  const isSelf = gameState.activePlayerId === player.id;

  if (gameState?.phase === 'combat' && isSelf) {
    return {
      title: 'Declare Attackers',
      // eslint-disable-next-line max-len
      description: [
        "Hover over a creature or a selection and press 'A' to declare attackers.",
        "Then click on an opponent or opponent's planeswalker to declare the attack.",
        "Press 'SPACE' to move to blocker declaration.",
      ],
    };
  }

  return null;
};

export default useInfoBoxText;
