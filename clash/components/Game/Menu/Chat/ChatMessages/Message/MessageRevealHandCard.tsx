import React from 'react';
import ColoredPlayerName from 'components/GameComponents/ColoredPlayerName/ColoredPlayerName';
import { LogPayloadRevealCardsFromHand } from 'backend/constants/logMessages';
import { pluralizeCards } from 'utils/i18nUtils';
import styles from '../../Chat.module.css';

interface Props {
  playerId: string;
  payload: LogPayloadRevealCardsFromHand;
}

const MessageRevealHandCard = ({ playerId, payload }: Props) => {
  const getRevealedCardsLabel = () => {
    if (payload.didRevealAllCards) {
      return 'their hand';
    }

    return pluralizeCards(payload.amount, 'a');
  };

  const getRevealedToLabel = () => {
    if (payload.toPlayerIds.length === 1) {
      return (
        <>
          {' to '}
          <ColoredPlayerName id={payload.toPlayerIds[0]} />
        </>
      );
    }

    return null;
  };

  return (
    <div className={styles.message}>
      <ColoredPlayerName id={playerId} />
      <span>
        {' revealed '}
        <b>{getRevealedCardsLabel()}</b>
        {getRevealedToLabel()}
      </span>
    </div>
  );
};

export default MessageRevealHandCard;
