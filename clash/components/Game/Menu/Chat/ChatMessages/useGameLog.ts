import { useContext } from 'react';

import GameStateContext from 'components/Game/GameStateContext';
import { MessageType } from '../ChatControls/ChatControls';

const useGameLog = (enabledTypes: MessageType[]) => {
  const { gameState } = useContext(GameStateContext);

  const { gameLog } = gameState!;

  const displayedLog = gameLog.filter(({ logKey }) => {
    if (!enabledTypes.length) return true;
    if (logKey === 'CHAT_MESSAGE') return enabledTypes.includes('CHAT');
    return enabledTypes.includes('LOG');
  });

  return {
    log: displayedLog,
  };
};

export default useGameLog;
