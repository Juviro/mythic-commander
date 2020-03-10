import { ValidationError } from 'apollo-server-koa';
import { updateLastEdit } from './helper';

const DEFAULT_ZONE = 'MAINBOARD';
const ON_DUPLICATE = ` ON CONFLICT ("deckId", "id") DO UPDATE SET amount = "cardToDeck".amount + EXCLUDED.amount`;

export default async (_, { cards, deckId }, { user, db }) => {
  const isAuthenticated = await db('decks')
    .where({ userId: user.id, id: deckId })
    .first();
  if (!isAuthenticated) throw new ValidationError('Not authenticated');

  const cardsToInsert = cards.map(({ id, amount = 1 }) => ({
    id,
    amount,
    deckId,
    zone: DEFAULT_ZONE,
  }));

  // TODO: don't allow duplicate cards
  const query = db('cardToDeck')
    .insert(cardsToInsert)
    .toString();

  await db.raw(query + ON_DUPLICATE);
  await updateLastEdit(deckId, db);

  return db('decks')
    .where({ id: deckId })
    .first();
};
