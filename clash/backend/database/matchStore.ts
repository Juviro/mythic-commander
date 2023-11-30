import { Lobby } from 'backend/lobby/GameLobby.types';
import { GameState } from './gamestate.types';
import db from './db';

interface Card {
  id: string;
  name: string;
  amount: number;
  manaValue: number;
}

interface Deck {
  id: string;
  name: string;
  commanderIds: string[];
  cards: Card[];
}

export const getDecks = async (lobby: Lobby): Promise<Deck[]> => {
  const deckIds = lobby.players.map((player) => player.deck!.id);

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
                    'name', cards.name
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
  lobby: Lobby,
  gameState: GameState
): Promise<void> => {
  await db('gameStates')
    .insert({
      id: lobby.id,
      state: gameState,
      lobby,
    })
    .onConflict('id')
    .merge();
};

export const getGameState = async (
  gameId: string
): Promise<{ gameState: GameState; lobby: Lobby }> => {
  const { state, lobby }: { state: GameState; lobby: Lobby } = await db('gameStates')
    .where({
      id: gameId,
    })
    .first();

  return {
    gameState: state,
    lobby,
  };
};
