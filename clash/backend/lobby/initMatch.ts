import uniqid from 'uniqid';

import { getDecks, storeGameState } from 'backend/database/matchStore';
import { Lobby } from 'backend/lobby/GameLobby.types';
import { Card, GameState, Player } from 'backend/database/gamestate.types';

const STARTING_LIFE = 40;

const initMatch = async (lobby: Lobby) => {
  const decks = await getDecks(lobby);

  const decksWithSpreadedCards = decks.map((deck) => {
    const commanders: Card[] = [];

    const cards = deck.cards
      .filter((card) => {
        if (deck.commanderIds.includes(card.id)) {
          commanders.push({
            id: card.id,
            name: card.name,
            clashId: uniqid(),
          });
          return false;
        }

        return true;
      })
      .map((card) => {
        const spreadeCards = [];
        for (let i = 0; i < card.amount; i += 1) {
          spreadeCards.push({
            id: card.id,
            name: card.name,
            manaValue: card.manaValue,
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
    const deck = decksWithSpreadedCards.find(
      (spreadDeck) => spreadDeck.id === player.deck!.id
    )!;

    const removeManaValue = (card: Card) => ({
      ...card,
      manaValue: undefined,
    });

    const hand = deck.cards
      .slice(0, 7)
      .sort((a, b) => a.manaValue - b.manaValue)
      .map(removeManaValue);
    const library = deck.cards.slice(7).map(removeManaValue);

    return {
      id: player.id,
      name: player.username,
      color: player.color!,
      commanders: deck.commanders,
      life: STARTING_LIFE,
      zones: {
        hand,
        library,
        commandZone: deck.commanders,
        exile: [],
        graveyard: [],
        battlefield: [],
      },
    };
  });

  const sortedPlayers = players.sort(() => Math.random() - 0.5);

  const initialGameState: GameState = {
    gameId: lobby.id,
    players: sortedPlayers,
    turn: 0,
    activePlayerId: sortedPlayers[0].id,
    gameLog: [],
  };

  await storeGameState(lobby.id, initialGameState);
};

export default initMatch;
