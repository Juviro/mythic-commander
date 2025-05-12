import uniqid from 'uniqid';
import { Lobby, PlanechaseSet } from 'backend/lobby/GameLobby.types';
import { randomizeArray } from 'utils/randomizeArray';
import { ActivePlane, GameState, LayoutType } from './gamestate.types';
import db from './db';

interface Part {
  id: string;
  name: string;
  component: string;
  type_line: string;
  produced_mana: string[];
}

export interface InitMatchCard {
  id: string;
  name: string;
  amount: number;
  manaValue: number;
  transformable: boolean;
  flippable: boolean;
  type_line: string;
  produced_mana: string[];
  layout: LayoutType;
  all_parts: Part[];
}

export interface Deck {
  id: string;
  name: string;
  commanderIds: string[];
  cards: InitMatchCard[];
}

const loadMythicCommanderDecks = async (deckIds: string[]): Promise<Deck[]> => {
  const { rows: decks } = await db.raw(
    `
        SELECT 
            decks.id,
            decks.name,
            (
                SELECT 
                  array_agg(id)
                FROM 
                    "cardToDeck" 
                WHERE 
                    "cardToDeck"."deckId" = decks.id 
                AND 
                    "isCommander" = true 
                LIMIT 1
            ) as "commanderIds",
            jsonb_agg(
                json_build_object(
                    'id', "cardToDeck".id,
                    'manaValue', cards.cmc,
                    'amount', "cardToDeck".amount,
                    'name', cards.name,
                    'type_line', cards.type_line,
                    'produced_mana', cards.produced_mana,
                    'all_parts', cards.all_parts,
                    'layout', cards.layout,
                    'flippable', cards.layout = 'flip',
                    'transformable', cards.layout = 'transform' 
                                 OR cards.layout = 'modal_dfc' 
                                 OR cards.layout = 'double_faced_token'
                )
            ) as cards
        FROM
            decks
        LEFT JOIN
            "cardToDeck"
        ON
            "cardToDeck"."deckId" = decks.id
        LEFT JOIN 
            cards
        ON
            cards.id = "cardToDeck".id
        WHERE 
            decks.id = ANY(?)
        GROUP BY 
            decks.id, decks.name
  `,
    [deckIds]
  );

  return decks;
};

const loadPreconDecks = async (deckIds: string[]): Promise<Deck[]> => {
  const decks = await db('precons').whereIn('id', deckIds);

  const formattedDecks = decks.map((deck) => {
    const partialDeck = {
      id: deck.id,
      name: deck.name,
      commanderIds: deck.commanders.map((commander: { id: string }) => commander.id),
      cards: deck.cards,
      commanders: deck.commanders,
    };
    return partialDeck;
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const deck of formattedDecks) {
    const allCards = deck.cards.concat(deck.commanders);
    const cardIds = allCards.map((card: { id: string }) => card.id);
    // eslint-disable-next-line no-await-in-loop
    const cards = await db('cards').whereIn('id', cardIds);
    const formattedCards = cards.map((card) => ({
      id: card.id,
      manaValue: card.cmc,
      amount: deck.cards.find((c: { id: string }) => c.id === card.id)?.amount || 1,
      name: card.name,
      type_line: card.type_line,
      produced_mana: card.produced_mana,
      all_parts: card.all_parts,
      layout: card.layout as LayoutType,
      flippable: card.layout === 'flip',
      transformable:
        card.layout === 'transform' ||
        card.layout === 'modal_dfc' ||
        card.layout === 'double_faced_token',
    }));
    deck.cards = formattedCards;
  }

  return formattedDecks;
};

export const getDecks = async (deckIds: string[]): Promise<Deck[]> => {
  const mythicCommanderDecks = await loadMythicCommanderDecks(deckIds);
  const preconDecks = await loadPreconDecks(deckIds);

  return mythicCommanderDecks.concat(preconDecks);
};

const INVALID_PLANECHASE_NAMES = [
  // allows selecting a plane out of five cards
  'Interplanar Tunnel',
  // allows a seconds plane to be active
  'Spatial Merging',
  // allows a multiple planes to be active
  "Norn's Seedcore",
  // changes the turn order
  'Time Distortion',
];

interface Plane {
  id: string;
  name: string;
  type_line: string;
  oracle_text: string;
}

export const getPlanes = async (
  planechaseSets?: PlanechaseSet[]
): Promise<ActivePlane[]> => {
  if (!planechaseSets) return [];

  const setKeys = planechaseSets.map(({ set }) => set);

  const { rows: planes } = await db.raw<{ rows: Plane[] }>(
    `
    SELECT 
      DISTINCT ON (name) name, 
      id, 
      type_line,
      oracle_text
    FROM 
      cards 
    WHERE 
      set = ANY (?) AND NOT (name = ANY (?))
    AND 
      (type_line ILIKE 'Plane %' OR type_line ILIKE 'Phenomenon')
    `,
    [setKeys, INVALID_PLANECHASE_NAMES]
  );

  const randomizedPlanes = randomizeArray(planes);

  let numberOfPhenomena = 0;

  // 2 Phenomena are guaranteed, then 1 for every 20 planes
  const maxNumbersOfPhenomena = Math.max(2, Math.floor(planes.length / 20));

  const planesWithMaxTwoPhenomena = randomizedPlanes
    .filter((plane) => {
      if (!plane.type_line.includes('Phenomenon')) return true;

      if (numberOfPhenomena >= maxNumbersOfPhenomena) return false;

      numberOfPhenomena += 1;

      return true;
    })
    .map((plane) => ({
      id: plane.id,
      clashId: uniqid(),
      name: plane.name,
      type_line: plane.type_line,
      oracle_text: plane.oracle_text,
    }));

  return planesWithMaxTwoPhenomena;
};

export const storeGameState = async (
  gameId: string,
  gameState: GameState,
  lobby?: Lobby
): Promise<any> => {
  const valueToStore: any = {
    id: gameId,
    state: gameState,
    lastUpdate: new Date(),
  };

  if (lobby) {
    valueToStore.lobby = lobby;
  }

  return db('gameStates').insert(valueToStore).onConflict('id').merge();
};

export const getGameState = async (
  gameId: string
): Promise<{ gameState: GameState; lobby: Lobby }> => {
  const { state, lobby }: { state: GameState; lobby: Lobby } = (await db('gameStates')
    .where({
      id: gameId,
    })
    .first()) || { gameState: null, lobby: null };

  return {
    gameState: state,
    lobby,
  };
};
