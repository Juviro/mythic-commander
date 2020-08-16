import { useState, useEffect, useRef } from 'react';

const MAX_LAST_DELAY = 1500;
const MIN_LAST_DELAY = 1000;
const INITIAL_DELAY = 100;
const DELAY_GROWTH = 1.15;

const BLINK_INTERVAL = 400;
const BLINK_LENGTH = 15;

const getLastDelay = () => {
  return Math.floor(Math.random() * (MAX_LAST_DELAY - MIN_LAST_DELAY)) + MIN_LAST_DELAY;
};

export default players => {
  const playerIds = players.map(({ id }) => id);

  const [highlightedPlayerIndex, setHighlightedPlayerIndex] = useState(null);
  const playerIndexRef = useRef(highlightedPlayerIndex);
  playerIndexRef.current = highlightedPlayerIndex;

  const timeoutRef = useRef(null);

  const onBlink = (playerId, remainingLength = BLINK_LENGTH) => {
    if (!remainingLength) {
      timeoutRef.current = setTimeout(() => setHighlightedPlayerIndex(null), 3000);
    } else {
      const nextPlayerIndex = playerIndexRef.current === null ? playerId : null;
      setHighlightedPlayerIndex(nextPlayerIndex);
      timeoutRef.current = setTimeout(
        () => onBlink(playerId, remainingLength - 1),
        BLINK_INTERVAL
      );
    }
  };

  const onRotateHighlight = (currentDelay, maxDelay) => {
    const currentIndex = playerIndexRef.current;
    const nextIndex = currentIndex === playerIds.length - 1 ? 0 : (currentIndex || 0) + 1;
    if (currentDelay >= maxDelay) {
      onBlink(playerIndexRef.current);
      return;
    }
    setHighlightedPlayerIndex(nextIndex);

    timeoutRef.current = setTimeout(
      () => onRotateHighlight(currentDelay * DELAY_GROWTH, maxDelay),
      currentDelay
    );
  };

  const onSelectRandomPlayer = () => {
    const lastDelay = getLastDelay();
    onRotateHighlight(INITIAL_DELAY, lastDelay);
  };

  // eslint-disable-next-line
  useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), []);

  // eslint-disable-next-line
  useEffect(onSelectRandomPlayer, []);

  const highlightedPlayerId = playerIds[highlightedPlayerIndex];

  return { highlightedPlayerId, onSelectRandomPlayer };
};
