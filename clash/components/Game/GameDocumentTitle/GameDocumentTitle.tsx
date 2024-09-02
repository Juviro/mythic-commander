import React, { useContext } from 'react';
import Head from 'next/head';
import GameStateContext from '../GameStateContext';

const FALLBACK_TITLE = 'Game - Mythic-Commander';

const GameDocumentTitle = () => {
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
