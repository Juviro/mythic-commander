import { getDecks, getPlanes, storeGameState } from 'backend/database/matchStore';
import { Lobby } from 'backend/lobby/GameLobby.types';
import { Card, GameState, Player, VisibleCard } from 'backend/database/gamestate.types';
import { randomizeArray } from 'utils/randomizeArray';
import { Deck } from 'backend/database/matchStore.types';
import getInitialCards from './getInitialCards';
import getTokens from './getTokens';

const STARTING_LIFE = 40;

export const sortInitialHand = (
  a: Omit<VisibleCard, 'ownerId'>,
  b: Omit<VisibleCard, 'ownerId'>
) => {
  const isLand = (card: Omit<VisibleCard, 'ownerId'>) => {
    return card.type_line.split('//').at(0)?.includes('Land');
  };

  if (isLand(a) !== isLand(b)) {
    return isLand(a) ? -1 : 1;
  }
  return a.manaValue - b.manaValue;
};
const initMatch = async (lobby: Lobby, shouldStoreGameState = true) => {
  const deckIds = lobby.players.map((player) => player.deck!.id);
  const decks = await getDecks(deckIds);
  const planes = await getPlanes(lobby.planechaseSets);

  const getCommanders = (deck: Deck) => {
    const initialDeck = lobby.players.find((player) => player.deck!.id === deck.id)?.deck;
    return initialDeck?.commanderIds || deck.commanderIds;
  };

  const decksWithSpreadedCards = decks.map((deck) => {
    const commanderIds = getCommanders(deck);
    const { cards, commanders, isFurryFriend } = getInitialCards(
      deck.cards,
      commanderIds
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

    const hand = deck.cards.slice(0, 7).sort(sortInitialHand).map(addOwnerId);
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

  const [activePlane] = planes.splice(0, 1);

  const planechase = activePlane
    ? ({
        planesDeck: planes,
        activePlane,
        diceRollCost: 0,
        lastDiceResult: 'planeswalk',
        lastDiceRollTimestamp: Date.now(),
      } as const)
    : undefined;

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
    stack: { visible: false, cards: [] },
    rematchModalOpen: false,
    hoveredCards: {},
    planechase,
  };

  if (shouldStoreGameState) {
    await storeGameState(lobby.id, initialGameState, lobby);
  }

  return initialGameState;
};

export default initMatch;
