import React, { useContext, useEffect, useRef, useState } from 'react';

import Emote from 'components/lib/Emote/Emote';
import { Player } from 'backend/database/gamestate.types';
import GameStateContext, { InitializedGameState } from 'components/Game/GameStateContext';
import { createPortal } from 'react-dom';
import styles from './PlayerEmote.module.css';

const EMOTE_DURATION = 3500;

interface Props {
  player: Player;
}

const PlayerEmote = ({ player }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { gameState } = useContext(GameStateContext) as InitializedGameState;
  const playerEmote = gameState.players.find((p) => p.id === player.id)?.emote;

  useEffect(() => {
    if (!playerEmote) {
      setIsVisible(false);
      return undefined;
    }

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    setIsVisible(true);

    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, EMOTE_DURATION);

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [playerEmote, hideTimerRef]);

  if (!isVisible || !playerEmote) return null;

  const shouldShowEmote = playerEmote.timestamp > Date.now() - EMOTE_DURATION;
  const playerBattlefield = document.getElementById(`battlefield-${player.id}`);

  if (!playerBattlefield || !shouldShowEmote) return null;

  const component = (
    <div className={styles.player_emote} onClick={() => setIsVisible(false)}>
      {/* key to make sure the emote always starts at the first frame */}
      <Emote
        id={playerEmote.emote}
        additionalClassName={styles.emote}
        key={playerEmote.emote}
      />
    </div>
  );

  return createPortal(component, playerBattlefield);
};

export default PlayerEmote;
