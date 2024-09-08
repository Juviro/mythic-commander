import React, { useContext } from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';

import BeginningIcon from 'public/assets/icons/phase_beginning.svg';
import MainIcon from 'public/assets/icons/phase_main.svg';
import CombatIcon from 'public/assets/icons/phase_combat.svg';
import EndIcon from 'public/assets/icons/phase_end.svg';
import { Phase, PHASES } from 'backend/database/gamestate.types';

import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import { getPhaseName } from '../Chat/ChatMessages/Message/MessageSetPhase';

import styles from './Phases.module.css';

interface Props {
  phase: Phase;
}

const PhaseIcon = ({ phase }: Props) => {
  const { gameState, player, stopPoint } = useContext(GameStateContext);
  const { setPhase, setStopPoint } = useGameActions();
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

  const getTooltip = () => {
    const baseTooltip = `${getPhaseName(phase)} phase`;
    if (isOwnTurn) return baseTooltip;

    if (stopPoint !== phase) return `Set stop point at beginning of ${baseTooltip}`;

    return 'Remove stop point';
  };

  const canSetPhase = !isActive && isOwnTurn;
  const canRequestStopPoint =
    !isOwnTurn && PHASES.indexOf(phase) > PHASES.indexOf(currentPhase);

  const onClick = () => {
    if (canSetPhase) {
      setPhase(phase);
    } else if (canRequestStopPoint) {
      setStopPoint(phase);
    }
  };

  return (
    <Tooltip title={getTooltip()} mouseEnterDelay={0.5}>
      <button
        onClick={onClick}
        type="button"
        className={classNames(styles.phase_icon, {
          [styles.phase_icon__active]: isActive,
          [styles.phase_icon__clickable]: canSetPhase || canRequestStopPoint,
          [styles.phase_icon__stop_requested]: stopPoint === phase,
        })}
      >
        {getIcon()}
      </button>
    </Tooltip>
  );
};

export default PhaseIcon;
