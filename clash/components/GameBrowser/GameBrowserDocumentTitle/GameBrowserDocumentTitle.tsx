import { Lobby } from 'backend/lobby/GameLobby.types';
import Head from 'next/head';
import React from 'react';

interface Props {
  currentLobby?: Lobby;
}

const GameBrowserDocumentTitle = ({ currentLobby }: Props) => {
  if (!currentLobby) {
    return null;
  }

  const numberOfPlayers = currentLobby.players.length;
  const readyPlayers = currentLobby.players.filter((player) => player.isReady).length;

  let documentTitle =
    currentLobby && `${currentLobby.name} - ${readyPlayers}/${numberOfPlayers} ready`;

  if (currentLobby.gameLoading) {
    documentTitle = 'Starting game...';
  }

  return (
    <Head>
      <title>{documentTitle}</title>
      <meta name="description" content="Play EDH Online" />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  );
};

export default GameBrowserDocumentTitle;
