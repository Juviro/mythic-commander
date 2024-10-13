import React, { useContext } from 'react';
import { Modal } from 'antd';

import GameStateContext from 'components/Game/GameStateContext';
import DeckSelection from 'components/GameBrowser/GameLobby/GameLobbyPlayer/DeckSelection/DeckSelection';
import useGameActions from 'components/Game/useGameActions';
import PlayerReadyButton from 'components/GameBrowser/GameLobby/GameLobbyPlayer/PlayerReadyButton';

import styles from './Rematch.module.css';

const Rematch = () => {
  const { gameState, player: self } = useContext(GameStateContext);
  const { onSelectRematchDeck } = useGameActions();

  if (!gameState?.rematchModalOpen) {
    return null;
  }

  return (
    <Modal
      centered
      open
      title={<h3 className={styles.modal_title}>Rematch</h3>}
      footer={null}
      closeIcon={null}
    >
      {gameState.players.map((player) => (
        <div key={player.id} className={styles.player}>
          <div className={styles.player_name}>{player.name}</div>
          <DeckSelection
            playerId={player.id}
            onSelectDeck={(deck) => onSelectRematchDeck({ deck })}
            canSelectDeck={player.id === self.id}
            isReady={player.rematchOptions?.isReady ?? false}
            deck={player.rematchOptions?.deck}
          />
          <PlayerReadyButton
            isReady={player.rematchOptions?.isReady ?? false}
            canEdit={player.id === self.id}
            onChange={(isReady) => onSelectRematchDeck({ isReady })}
          />
        </div>
      ))}
      <div className={styles.info_text}>Waiting for all players to ready up...</div>
    </Modal>
  );
};

export default Rematch;
