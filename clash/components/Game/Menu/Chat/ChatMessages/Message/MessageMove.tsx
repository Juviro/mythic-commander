import React, { ReactNode } from 'react';

import { LogPayloadMoveZone } from 'backend/constants/logMessages';
import { getCardinalNumberLabel } from 'utils/i18nUtils';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';
import MultipleCardNames from './MessageHelper/MultipleCardNames';

const getZoneLabelFrom = (zone: string, playerId?: string | null) => {
  if (playerId) {
    return (
      <>
        <ColoredPlayerName id={playerId} addGenetiveSuffix />
        {` ${zone}`}
      </>
    );
  }

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
      return 'their library';
    case 'stack':
      return 'the stack';
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
  playerId: string;
  payload: LogPayloadMoveZone;
}

const MessageMove = ({ payload, playerId }: Props) => {
  let action = '';
  let actionSuffix: ReactNode = '';

  if (payload.from.zone === 'hand') {
    switch (payload.to.zone) {
      case 'battlefield':
        action = 'played';
        break;
      case 'graveyard':
        action = 'discarded';
        break;
      default:
        break;
    }
  }
  if (payload.from.zone === 'commandZone') {
    switch (payload.to.zone) {
      case 'battlefield':
        action = 'casted their commander';
        break;
      default:
        break;
    }
  }

  if (payload.to.zone === 'exile') {
    action = 'exiled';
    actionSuffix = `from ${getZoneLabelFrom(payload.from.zone)}`;
  }

  if (payload.to.zone === 'library' && payload.to.libraryPosition !== null) {
    action = 'put';

    if (typeof payload.to.libraryPosition === 'number') {
      actionSuffix = (
        <>
          <span>into their library </span>
          <b>{getCardinalNumberLabel(payload.to.libraryPosition)}</b>
          <span> from the top</span>
        </>
      );
    } else {
      actionSuffix = (
        <>
          <span>on</span>
          <span>{payload.to.libraryPosition === 'bottom' && ' the'}</span>
          <b>{` ${payload.to.libraryPosition} `}</b>
          <span>of their library</span>
        </>
      );
    }
  }

  if (!action) {
    action = 'put';
    const isOwnZone = playerId === payload.from.playerId;
    const fromPlayerId = isOwnZone ? null : payload.from.playerId;
    const zoneLabelFrom = getZoneLabelFrom(payload.from.zone, fromPlayerId);
    const zoneLabelTo = getZoneLabelTo(payload.to.zone);
    actionSuffix = (
      <>
        {'from '}
        {zoneLabelFrom} {zoneLabelTo}
      </>
    );
  }

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        {` ${action} `}
        <MultipleCardNames cardNames={payload.cardNames} />
        {actionSuffix && <> {actionSuffix}</>}
      </span>
    </div>
  );
};

export default MessageMove;
