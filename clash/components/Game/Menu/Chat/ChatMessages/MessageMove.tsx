import React from 'react';

import { LogPlayoadMoveZone } from 'backend/constants/logMessages';
import ColoredPlayerName from './ColoredPlayerName';

import styles from '../Chat.module.css';

const getZoneLabelFrom = (zone: string) => {
  switch (zone) {
    case 'hand':
      return 'their hand';
    case 'battlefield':
      return 'the battlefield';
    case 'graveyard':
      return 'the graveyard';
    case 'exile':
      return 'exile';
    case 'commandZone':
      return 'the command zone';
    case 'library':
      return 'the top of the library';
    default:
      return zone;
  }
};

const getZoneLabelTo = (zone: string) => {
  switch (zone) {
    case 'hand':
      return 'into their hand';
    case 'battlefield':
      return 'onto the battlefield';
    case 'graveyard':
      return 'into the graveyard';
    case 'exile':
      return 'into exile';
    case 'commandZone':
      return 'into the command zone';
    case 'library':
      return 'on top of the library';
    default:
      return zone;
  }
};

interface Props {
  playerName: string;
  playerId: string;
  payload: LogPlayoadMoveZone;
}

const MessageMove = ({ payload, playerId, playerName }: Props) => {
  let action = '';
  let actionSuffix = '';

  if (payload.from.zone === 'hand') {
    switch (payload.to.zone) {
      case 'battlefield':
        action = 'played';
        break;
      case 'graveyard':
        action = 'discarded';
        break;
        break;
      default:
        break;
    }
  }
  if (payload.from.zone === 'library') {
    switch (payload.to.zone) {
      case 'graveyard':
        action = 'milled';
        break;
      case 'hand':
        action = 'drew';
        break;
      default:
        break;
    }
  }

  if (!action) {
    action = 'put';
    const zoneLabelFrom = getZoneLabelFrom(payload.from.zone);
    const zoneLabelTo = getZoneLabelTo(payload.to.zone);
    actionSuffix = `from ${zoneLabelFrom} ${zoneLabelTo}`;
  }

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} name={playerName} />
      <span>
        {` ${action} `}
        <b>{payload.cardName}</b>
        {actionSuffix && ` ${actionSuffix}`}
      </span>
    </div>
  );
};

export default MessageMove;