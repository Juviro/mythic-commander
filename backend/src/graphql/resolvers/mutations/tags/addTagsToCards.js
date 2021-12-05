import { canEditDeck } from '../../../../auth/authenticateUser';
import unifyCardFormat from '../../unifyCardFormat';

export default async (
  _,
  { tags, cardIds, deckId },
  { user: { id: userId }, db }
) => {
  await canEditDeck(userId, deckId);

  await db.raw(
    `
      UPDATE "cardToDeck"
      SET tags = (select array_agg(distinct e) from unnest(tags || ?) e)
      WHERE "deckId" = ?
      AND id = ANY(?)
    `,
    [tags, deckId, cardIds]
  );

  const updatedCards = await db('cardToDeck')
    .leftJoin('cards', { 'cards.id': 'cardToDeck.id' })
    .whereIn('cardToDeck.id', cardIds)
    .andWhere({ deckId });

  return updatedCards.map(unifyCardFormat(deckId));
};
