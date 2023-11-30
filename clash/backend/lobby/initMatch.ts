import uniqid from 'uniqid';

import { getDecks, storeGameState } from 'backend/database/matchStore';
import { Lobby } from 'backend/lobby/GameLobby.types';
import { Card, GameState, Player, VisibleCard } from 'backend/database/gamestate.types';

const STARTING_LIFE = 40;

// Fisher-Yates algorithm
const shuffleArray = (array: any[]) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
};

const initMatch = async (lobby: Lobby) => {
  const decks = await getDecks(lobby);

  const decksWithSpreadedCards = decks.map((deck) => {
    const commanders: Omit<VisibleCard, 'ownerId'>[] = [];

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

    const randomizedCards = shuffleArray(cards);

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

    const removeManaValue = (card: Omit<Card, 'ownerId'>) => ({
      ...card,
      ownerId: player.id,
      manaValue: undefined,
    });

    const hand = deck.cards
      .slice(0, 7)
      .sort((a, b) => a.manaValue - b.manaValue)
      .map(removeManaValue);
    const library = deck.cards.slice(7).map(removeManaValue);

    const commandZone = deck.commanders.map((commander) => ({
      ...commander,
      ownerId: player.id,
    }));

    const commanders = commandZone.map((commander) => ({
      ...commander,
      commanderDamageDealt: {},
      timesCasted: 0,
    }));

    return {
      id: player.id,
      name: player.username,
      color: player.color!,
      commanders,
      life: STARTING_LIFE,
      zones: {
        hand,
        library,
        commandZone,
        exile: [],
        graveyard: [],
        battlefield: [],
      },
    };
  });

  const randomizedPlayers = shuffleArray(players);

  const initialGameState: GameState = {
    hostId: lobby.hostId,
    gameId: lobby.id,
    players: randomizedPlayers,
    turn: 1,
    phase: 'beginning',
    activePlayerId: randomizedPlayers[0].id,
    gameLog: [],
  };

  await storeGameState(lobby.id, initialGameState, lobby);
};

export default initMatch;
