import { useToggle } from 'components/Hooks';
import { useState, useEffect, useRef } from 'react';
import { preloadByStrings } from 'utils/preloadImages';

const INITIAL_DELAY = 50;
const DELAY_GROWTH = 1.15;

const BLINK_INTERVAL = 400;
const BLINK_LENGTH = 12;

const MIN_TICKS = 18;

const getNumberOfTicks = (numberOfPlayers) => {
  const startingPlayerIndex = Math.floor(Math.random() * numberOfPlayers);
  let currentTicks = 0;
  while (currentTicks < MIN_TICKS) {
    currentTicks += numberOfPlayers;
  }
  return currentTicks + startingPlayerIndex;
};

export default (players) => {
  const [isLoading, toggleIsLoading] = useToggle(true);
  const playerIds = players.map(({ id }) => id).reverse();

  const [highlightedPlayerIndex, setHighlightedPlayerIndex] = useState(null);
  const playerIndexRef = useRef(highlightedPlayerIndex);
  playerIndexRef.current = highlightedPlayerIndex;

  const timeoutRef = useRef(null);

  const onBlink = (playerId, remainingLength = BLINK_LENGTH) => {
    if (!remainingLength) {
      setHighlightedPlayerIndex(playerId);
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

  const onRotateHighlight = (currentDelay, remainingTicks) => {
    const currentIndex = playerIndexRef.current ?? 0;
    const nextIndex = currentIndex === playerIds.length - 1 ? 0 : currentIndex + 1;
    if (!remainingTicks) {
      onBlink(playerIndexRef.current);
      return;
    }
    setHighlightedPlayerIndex(nextIndex);

    timeoutRef.current = setTimeout(
      () => onRotateHighlight(currentDelay * DELAY_GROWTH, remainingTicks - 1),
      currentDelay
    );
  };

  const onSelectRandomPlayer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const numberOfTicks = getNumberOfTicks(playerIds.length);
    onRotateHighlight(INITIAL_DELAY, numberOfTicks);
  };

  // eslint-disable-next-line
  useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), []);

  // eslint-disable-next-line
  useEffect(() => {
    const preloadImages = async () => {
      try {
        await preloadByStrings(players.map(({ img }) => img).filter(Boolean));
      } catch {
        // Do nothing
      }
      toggleIsLoading();
      onSelectRandomPlayer();
    };
    preloadImages();
    // eslint-disable-next-line
  }, []);

  const highlightedPlayerId = playerIds[highlightedPlayerIndex];

  return { highlightedPlayerId, onSelectRandomPlayer, isLoading };
};
