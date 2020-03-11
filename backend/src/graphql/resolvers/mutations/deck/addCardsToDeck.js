import { ValidationError } from 'apollo-server-koa';
import { updateLastEdit } from './helper';

const DEFAULT_ZONE = 'MAINBOARD';

export default async (_, { cards, deckId }, { user, db }) => {
  const isAuthenticated = await db('decks')
    .where({ userId: user.id, id: deckId })
    .first();
  if (!isAuthenticated) throw new ValidationError('Not authenticated');

  const { rows: cardsAlreadyInDeck } = await db.raw(
    `
    SELECT cards.id 
    FROM cards 
    LEFT JOIN "cardToDeckWithOracle" 
      ON "cardToDeckWithOracle".oracle_id = cards.oracle_id 
    WHERE cards.id = ANY(?)
      AND "deckId" = ?;
  `,
    [cards.map(({ id }) => id), deckId]
  );

  const cardIdsAlreadyInDeck = cardsAlreadyInDeck.map(({ id }) => id);
  const cardsToInsert = cards
    .filter(({ id }) => !cardIdsAlreadyInDeck.includes(id))
    .map(({ id, amount = 1 }) => ({
      id,
      amount,
      deckId,
      zone: DEFAULT_ZONE,
    }));

  await db('cardToDeck')
    .insert(cardsToInsert)
    .toString();

  await updateLastEdit(deckId, db);

  return db('decks')
    .where({ id: deckId })
    .first();
};
