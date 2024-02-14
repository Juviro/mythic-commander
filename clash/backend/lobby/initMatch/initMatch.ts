import { getDecks, storeGameState } from 'backend/database/matchStore';
import { Lobby } from 'backend/lobby/GameLobby.types';
import { Card, GameState, Player } from 'backend/database/gamestate.types';
import { randomizeArray } from 'utils/randomizeArray';
import getInitialCards from './getInitialCards';
import getTokens from './getTokens';

const STARTING_LIFE = 40;

const initMatch = async (lobby: Lobby) => {
  const decks = await getDecks(lobby);

  const decksWithSpreadedCards = decks.map((deck) => {
    const { cards, commanders, isFurryFriend } = getInitialCards(
      deck.cards,
      deck.commanderIds
    );

    return {
      id: deck.id,
      name: deck.name,
      cards,
      commanders,
      isFurryFriend,
    };
  });

  const players: Player[] = lobby.players.map((player) => {
    const deck = decksWithSpreadedCards.find(
      (spreadDeck) => spreadDeck.id === player.deck!.id
    )!;

    const addOwnerId = (card: Omit<Card, 'ownerId'>) => ({
      ...card,
      ownerId: player.id,
    });

    const hand = deck.cards
      .slice(0, 7)
      .sort((a, b) => a.manaValue - b.manaValue)
      .map(addOwnerId);
    const library = deck.cards.slice(7).map(addOwnerId);

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
      additionalPlayerInfo: {
        isFurryFriend: deck.isFurryFriend,
      },
      mulligan: {
        mulligansTaken: 0,
        cardsAccepted: false,
      },
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

  const randomizedPlayers = randomizeArray(players);

  const tokens = await getTokens();

  const resources = { tokens };

  const initialGameState: GameState = {
    hostId: lobby.hostId,
    gameId: lobby.id,
    players: randomizedPlayers,
    turn: 1,
    phase: 'beginning',
    activePlayerId: randomizedPlayers[0].id,
    gameLog: [],
    resources,
    winner: null,
  };

  await storeGameState(lobby.id, initialGameState, lobby);
};

export default initMatch;
