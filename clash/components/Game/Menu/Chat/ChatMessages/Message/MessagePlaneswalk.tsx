import React from 'react';

import { LogPayloadPlaneswalk } from 'backend/constants/logMessages';
import { capitalizeFirstLetter } from 'components/GameBrowser/GameLobby/GameLobbyPlayer/DeckSelection/DeckSelectionModal/DeckStatusTag';
import ColoredPlayerName from '../../../../../GameComponents/ColoredPlayerName/ColoredPlayerName';

import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadPlaneswalk;
}

const getOldOracleText = ({ oldPlaneText }: LogPayloadPlaneswalk) => {
  if (!oldPlaneText) return null;

  // Text is something like
  // "When you planeswalk away from CARDNAME, ACTION"
  const action = oldPlaneText.match(/,\s(.*)/)?.[1];
  if (!action) return null;

  return capitalizeFirstLetter(action);
};

const MessagePlaneswalk = ({ playerId, payload }: Props) => {
  const oldOracleText = getOldOracleText(payload);

  return (
    <div className={styles.message}>
      <span>
        <ColoredPlayerName id={playerId} />
        {' planeswalked to '}
        <b>{payload.newPlaneName}</b>
        {oldOracleText && (
          <>
            <span>. </span>
            <b>{oldOracleText}</b>
          </>
        )}
      </span>
    </div>
  );
};

export default MessagePlaneswalk;
