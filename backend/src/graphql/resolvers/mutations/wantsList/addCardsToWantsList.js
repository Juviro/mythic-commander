import { updateLastEdit } from './helper';
import {
  canAccessWantsList,
  canEditWantsList,
} from '../../../../auth/authenticateUser';
import unifyCardFormat from '../../unifyCardFormat';
import randomId from '../../../../utils/randomId';

const ON_CONFLICT = `
    ON CONFLICT (id, "wantsListId") 
    DO UPDATE SET 
      amount = "cardToWantsList".amount + EXCLUDED.amount, 
      "createdAt" = NOW()
  `;

export default async (
  _,
  { cards, wantsListId, wantsListName },
  { user: { id: userId }, db }
) => {
  if (!wantsListName || !userId) {
    // no need for an access check if we create a new list
    await canEditWantsList(userId, wantsListId);
  }
  if (wantsListName) {
    const [{ id }] = await db('wantsLists')
      .insert({ userId, name: wantsListName, id: randomId() })
      .returning('id');
    wantsListId = id;
  }

  await canAccessWantsList(userId, wantsListId);

  const { rows: cardsAlreadyInWantsList } = await db.raw(
    `
    SELECT cards.id as "addingId", "cardToWantsListWithOracle".id as "existingId"
    FROM cards 
    LEFT JOIN "cardToWantsListWithOracle" 
    ON "cardToWantsListWithOracle".oracle_id = cards.oracle_id 
    WHERE cards.id = ANY(?)
    AND "wantsListId" = ?;
    `,
    [cards.map(({ id }) => id), wantsListId]
  );

  const cardsToInsert = cards.map(({ id, amount = 1 }) => {
    const existingCard = cardsAlreadyInWantsList.find(
      ({ addingId }) => addingId === id
    );
    const insertId = existingCard ? existingCard.existingId : id;

    return {
      id: insertId,
      amount,
      wantsListId,
    };
  });

  const query = db('cardToWantsList').insert(cardsToInsert);

  await db.raw(query + ON_CONFLICT);

  await updateLastEdit(wantsListId, db);

  const insertedCards = await db('cardToWantsList')
    .leftJoin('cards', { 'cards.id': 'cardToWantsList.id' })
    .where({ wantsListId })
    .whereIn(
      'cards.id',
      cardsToInsert.map(({ id }) => id)
    );

  return insertedCards.map(unifyCardFormat(wantsListId));
};
