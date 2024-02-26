import { MenuProps } from 'antd';
import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import { useContext } from 'react';

const useGameInfoActions = () => {
  const { gameState, player: self } = useContext(GameStateContext);
  const { restartGame, resignGame } = useGameActions();

  const canResignGame =
    !self?.resigned && !gameState?.winner && gameState!.players.length > 1;
  const canRestartGame = self?.id === gameState!.hostId;

  const onRestartGame = () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const shouldRestart = confirm('Are you sure you want to restart the game?');
    if (!shouldRestart) return;
    restartGame();
  };

  const onResign = () => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const shouldResign = confirm('Are you sure you want to resign?');
    if (!shouldResign) return;
    resignGame();
  };

  const items: MenuProps['items'] = [];

  if (canResignGame) {
    items.push({
      key: 'resign',
      label: 'Resign',
      onClick: onResign,
    });
  }
  if (canRestartGame) {
    items.push({
      key: 'restart',
      label: 'Restart Game',
      onClick: onRestartGame,
    });
  }

  return {
    items,
  };
};

export default useGameInfoActions;
