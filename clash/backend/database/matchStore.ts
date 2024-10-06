import { Lobby } from 'backend/lobby/GameLobby.types';
import { GameState, LayoutType } from './gamestate.types';
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
  type_line: string;
  produced_mana: string[];
  layout: LayoutType;
  all_parts: Part[];
}

interface Deck {
  id: string;
  name: string;
  commanderIds: string[];
  cards: InitMatchCard[];
}

export const getDecks = async (deckIds: string[]): Promise<Deck[]> => {
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

export const storeGameState = async (
  gameId: string,
  gameState: GameState,
  lobby?: Lobby
): Promise<void> => {
  const valueToStore: any = {
    id: gameId,
    state: gameState,
    lastUpdate: new Date(),
  };

  if (lobby) {
    valueToStore.lobby = lobby;
  }

  await db('gameStates').insert(valueToStore).onConflict('id').merge();
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
