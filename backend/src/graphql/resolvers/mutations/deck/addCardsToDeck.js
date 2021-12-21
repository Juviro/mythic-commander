import { updateLastEdit } from './helper';
import { canEditDeck } from '../../../../auth/authenticateUser';
import randomId from '../../../../utils/randomId';

const ON_CONFLICT = `
    ON CONFLICT (id, "deckId") 
    DO UPDATE SET 
      amount = "cardToDeck".amount + EXCLUDED.amount, 
      tags = "cardToDeck".tags, 
      "createdAt" = NOW()
  `;

export default async (
  _,
  { cards, deckId, deckName },
  { user: { id: userId }, db }
) => {
  if (deckName) {
    const [id] = await db('decks')
      .insert({ userId, name: deckName, id: randomId() })
      .returning('id');
    deckId = id;
  } else {
    await canEditDeck(userId, deckId);
  }

  const cardIds = cards.map(({ id }) => id);

  const { rows: cardsAlreadyInDeck } = await db.raw(
    `
      SELECT cards.id as "addingId", "cardToDeckWithOracle".id as "existingId"
      FROM cards 
      LEFT JOIN "cardToDeckWithOracle" 
      ON "cardToDeckWithOracle".oracle_id = cards.oracle_id 
      WHERE cards.id = ANY(?)
      AND "deckId" = ?;
    `,
    [cardIds, deckId]
  );

  const { rows: defaultTags } = await db.raw(
    `
  SELECT cards.id, "defaultTags".tags
  FROM "defaultTags"
  LEFT JOIN cards
  ON cards.oracle_id = "defaultTags".oracle_id
  WHERE cards.id = ANY(?);
  `,
    [cardIds]
  );
  const tagMap = defaultTags.reduce(
    (acc, val) => ({ ...acc, [val.id]: val.tags }),
    {}
  );

  const cardsToInsert = cards.map(({ id, amount = 1 }) => {
    const existingCard = cardsAlreadyInDeck.find(
      ({ addingId }) => addingId === id
    );
    const insertId = existingCard ? existingCard.existingId : id;

    return {
      id: insertId,
      amount,
      deckId,
      tags: tagMap[id],
    };
  });

  const query = db('cardToDeck').insert(cardsToInsert);

  await db.raw(query + ON_CONFLICT);

  await updateLastEdit(deckId, db);

  return db('decks')
    .where({ id: deckId })
    .first();
};
