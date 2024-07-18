import React, { useContext } from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import useGameActions from 'components/Game/useGameActions';
import GameStateContext from 'components/Game/GameStateContext';
import { PHASES } from 'backend/database/gamestate.types';

import useShortcut from 'hooks/useShortcut';
import SHORTCUTS, { KEY_SYMBOLS } from 'constants/shortcuts';
import styles from './Phases.module.css';

const PhaseButtons = () => {
  const { gameState, hasGameStarted } = useContext(GameStateContext);
  const { endTurn, setPhase } = useGameActions();
  const currentPhase = gameState!.phase;

  const onNextPhase = () => {
    if (!hasGameStarted) return;
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

  useShortcut(SHORTCUTS.SPACE, onNextPhase, { disabled: !hasGameStarted });

  useShortcut(SHORTCUTS.SPACE, onPreviousPhase, {
    modifierKeys: ['shift'],
  });

  useShortcut(SHORTCUTS.ENTER, endTurn, { disabled: !hasGameStarted });

  return (
    <div className={styles.phase_buttons}>
      <Button
        ghost
        type="primary"
        onClick={onPreviousPhase}
        disabled={currentPhase === 'beginning'}
      >
        <LeftOutlined />
        Phase
      </Button>
      <Button ghost type="primary" onClick={onNextPhase} disabled={!hasGameStarted}>
        Phase {`[${KEY_SYMBOLS.SPACE}]`}
        <RightOutlined />
      </Button>
      <Button type="primary" onClick={endTurn} disabled={!hasGameStarted}>
        End Turn {`[${KEY_SYMBOLS.ENTER}]`}
      </Button>
    </div>
  );
};

export default PhaseButtons;
