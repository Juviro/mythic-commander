import React, { useContext } from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import useGameActions from 'components/Game/useGameActions';
import GameStateContext from 'components/Game/GameStateContext';
import { PHASES } from 'backend/database/gamestate.types';

import styles from './Phases.module.css';

const PhaseButtons = () => {
  const { gameState, player } = useContext(GameStateContext);
  const { endTurn, setPhase } = useGameActions();
  const currentPhase = gameState!.phase;

  const isOwnTurn = gameState?.activePlayerId === player?.id;

  const onNextPhase = () => {
    if (currentPhase === 'end') {
      endTurn();
    } else {
      setPhase(PHASES[PHASES.indexOf(currentPhase) + 1]);
    }
  };

  const onPreviousPhase = () => {
    if (currentPhase === 'beginning') return;
    setPhase(PHASES[PHASES.indexOf(currentPhase) - 1]);
  };

  return (
    <div className={styles.phase_buttons}>
      <Button
        ghost
        type="primary"
        onClick={onPreviousPhase}
        disabled={!isOwnTurn || currentPhase === 'beginning'}
      >
        <LeftOutlined />
        Previouse Phase
      </Button>
      <Button ghost type="primary" onClick={onNextPhase} disabled={!isOwnTurn}>
        Next Phase
        <RightOutlined />
      </Button>
      <Button type="primary" onClick={endTurn} disabled={!isOwnTurn}>
        End Turn
      </Button>
    </div>
  );
};

export default PhaseButtons;
