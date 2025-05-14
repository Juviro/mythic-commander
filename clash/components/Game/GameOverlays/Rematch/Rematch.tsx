import React, { useContext } from 'react';
import { Form, Modal } from 'antd';

import GameStateContext from 'components/Game/GameStateContext';
import DeckSelection from 'components/GameBrowser/GameLobby/GameLobbyPlayer/DeckSelection/DeckSelection';
import useGameActions from 'components/Game/useGameActions';
import PlayerReadyButton from 'components/GameBrowser/GameLobby/GameLobbyPlayer/PlayerReadyButton';

import PlanechaseSelection from 'components/GameBrowser/HostGame/PlanechaseSelection';
import styles from './Rematch.module.css';

const Rematch = () => {
  const { gameState, player: self } = useContext(GameStateContext);
  const { onSelectRematchDeck, onSetRematchPlanechaseOptions } = useGameActions();
  const [form] = Form.useForm();

  if (!gameState?.rematchOptions?.isModalOpen) {
    return null;
  }
  const isHost = self?.id === gameState!.hostId;

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
      {isHost && (
        <Form
          form={form}
          labelCol={{ span: 6 }}
          labelAlign="left"
          className={styles.form}
        >
          <PlanechaseSelection
            initialSelection={gameState.rematchOptions?.planechaseOptions?.map(
              (set) => set.set
            )}
            onSelectionChange={onSetRematchPlanechaseOptions}
          />
        </Form>
      )}
      {!isHost && Boolean(gameState.rematchOptions?.planechaseOptions?.length) && (
        <div>
          <div className={styles.planechase_selection_title}>
            Selected Planechase sets:
          </div>
          {gameState.rematchOptions.planechaseOptions!.map((set) => (
            <div key={set.set}>{set.setName}</div>
          ))}
        </div>
      )}
      <div className={styles.info_text}>Waiting for all players to ready up...</div>
    </Modal>
  );
};

export default Rematch;
