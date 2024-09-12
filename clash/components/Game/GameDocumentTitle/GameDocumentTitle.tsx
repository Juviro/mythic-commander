import React, { useContext } from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';
import GameStateContext from '../GameStateContext';

const FALLBACK_TITLE = 'Game - Mythic-Commander';

const GameDocumentTitle = () => {
  const pathname = usePathname();
  const { gameState } = useContext(GameStateContext);

  const getTitle = () => {
    if (!gameState) {
      return FALLBACK_TITLE;
    }

    const commanderNames = gameState.players
      .map((player) =>
        player.commanders.map(({ name }) => name.split(', ')[0]).join(' & ')
      )
      .join(' vs. ');

    if (pathname?.includes('/playtest/')) {
      return `Playtest - ${commanderNames}`;
    }

    return commanderNames;
  };

  return (
    <Head>
      <title>{getTitle()}</title>
      <meta name="description" content="Play EDH Online" />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  );
};

export default GameDocumentTitle;
