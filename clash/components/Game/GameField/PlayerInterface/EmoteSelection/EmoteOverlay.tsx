import React, { useRef } from 'react';

import { EmoteId, EMOTES } from 'components/lib/Emote/emoteIds';
import Emote from 'components/lib/Emote/Emote';
import useClickedOutside from 'hooks/useClickedOutside';
import useShortcut from 'hooks/useShortcut';
import SHORTCUTS from 'constants/shortcuts';
import useGameActions from 'components/Game/useGameActions';
import styles from './EmoteOverlay.module.css';

interface Props {
  onClose: () => void;
}

const EmoteOverlay = ({ onClose }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { onSendEmote } = useGameActions();

  useClickedOutside(wrapperRef, onClose);
  useShortcut(SHORTCUTS.CANCEL, onClose);

  const onEmoteClick = (emote: EmoteId) => {
    onClose();
    onSendEmote(emote);
  };

  return (
    <div className={styles.emote_overlay} ref={wrapperRef}>
      {Object.entries(EMOTES).map(([emote, name]) => (
        <button
          key={emote}
          type="button"
          className={styles.emote_container}
          onClick={() => onEmoteClick(emote as EmoteId)}
        >
          <Emote id={emote as EmoteId} />
          <div>{name}</div>
        </button>
      ))}
    </div>
  );
};

export default EmoteOverlay;
