import uniqid from 'uniqid';

import { getDecks, storeGameState } from 'backend/database/matchStore';
import { Lobby } from 'backend/websocket/GameLobby.types';
import { Commander, Card, GameState, Player } from 'backend/database/gamestate.types';

const initMatch = async (lobby: Lobby) => {
  const decks = await getDecks(lobby);

  const spreadDeckCards = decks.map((deck) => {
    const commanders: Commander[] = [];

    const cards = deck.cards
      .filter((card) => {
        if (deck.commanderIds.includes(card.id)) {
          commanders.push({
            id: card.id,
            name: card.name,
          });
          return false;
        }

        return true;
      })
      .map((card) => {
        const spreadeCards: Card[] = [];
        for (let i = 0; i < card.amount; i += 1) {
          spreadeCards.push({
            id: card.id,
            name: card.name,
            clashId: uniqid(),
          });
        }

        return spreadeCards;
      })
      .flat();

    const randomizedCards = cards.sort(() => Math.random() - 0.5);

    return {
      id: deck.id,
      name: deck.name,
      cards: randomizedCards,
      commanders: commanders!,
    };
  });

  const players: Player[] = lobby.players.map((player) => {
    const deck = spreadDeckCards.find((spreadDeck) => spreadDeck.id === player.deck!.id)!;

    return {
      id: player.id,
      name: player.username,
      commanders: deck.commanders,
      zones: {
        hand: deck.cards.slice(0, 7),
        library: deck.cards.slice(7),
        commandZone: deck.commanders,
        exile: [],
        graveyard: [],
      },
    };
  });

  const activePlayerId = players.sort(() => Math.random() - 0.5)[0].id;

  const initialGameState: GameState = {
    players,
    turn: 0,
    activePlayerId,
  };

  await storeGameState(lobby.id, initialGameState);
};

export default initMatch;
