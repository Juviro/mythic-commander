import React, { useContext } from 'react';

import BeginningIcon from 'public/assets/icons/phase_beginning.svg';
import MainIcon from 'public/assets/icons/phase_main.svg';
import CombatIcon from 'public/assets/icons/phase_combat.svg';
import EndIcon from 'public/assets/icons/phase_end.svg';
import { Phase } from 'backend/database/gamestate.types';

import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import classNames from 'classnames';
import styles from './Phases.module.css';

interface Props {
  phase: Phase;
}

const PhaseIcon = ({ phase }: Props) => {
  const { gameState, player } = useContext(GameStateContext);
  const { setPhase } = useGameActions();
  const currentPhase = gameState!.phase;

  const isActive = phase === currentPhase;

  const isOwnTurn = gameState?.activePlayerId === player?.id;

  const getIcon = () => {
    switch (phase) {
      case 'beginning':
        return <BeginningIcon />;
      case 'main1':
      case 'main2':
        return <MainIcon />;
      case 'combat':
        return <CombatIcon />;
      case 'end':
        return <EndIcon />;
      default:
        return null;
    }
  };

  const canSetPhase = !isActive && isOwnTurn;

  return (
    <button
      onClick={canSetPhase ? () => setPhase(phase) : undefined}
      type="button"
      className={classNames(styles.phase_icon, {
        [styles.phase_icon__active]: isActive,
        [styles.phase_icon__clickable]: canSetPhase,
      })}
    >
      {getIcon()}
    </button>
  );
};

export default PhaseIcon;
