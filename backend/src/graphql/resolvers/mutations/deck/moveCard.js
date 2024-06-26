import {
  canAccessDeck,
  canAccessWantsList,
  canEditDeck,
  canEditWantsList,
} from '../../../../auth/authenticateUser';

const DECK = 'DECK';
const WANTS = 'WANTS_LIST';

const typeToRelation = {
  [DECK]: 'decks',
  [WANTS]: 'wantsLists',
};

const canAccess = (userId, { id, type }) =>
  type === DECK ? canAccessDeck(userId, id) : canAccessWantsList(userId, id);

const canEdit = (userId, { id, type }) =>
  type === DECK ? canEditDeck(userId, id) : canEditWantsList(userId, id);

const getUpdatedList = ({ type, id }, db) =>
  db(typeToRelation[type]).where({ id }).first();

export default async (
  _,
  { cardId, from, to },
  { user: { id: userId }, db }
) => {
  await canAccess(userId, from);
  await canEdit(userId, to);

  const currentCard =
    from.type === DECK
      ? await db('cardToDeck')
          .where({ deckId: from.id, id: cardId })
          .select(['id', 'amount'])
          .first()
      : await db('cardToWantsList')
          .where({ wantsListId: from.id, id: cardId })
          .select(['id', 'amount'])
          .first();

  try {
    if (to.type === DECK) {
      await db('cardToDeck').insert({ ...currentCard, deckId: to.id });
    } else {
      await db('cardToWantsList').insert({
        ...currentCard,
        wantsListId: to.id,
      });
    }
  } catch {
    throw new Error('The target already contains this card');
  }

  if (from.type === DECK) {
    await db('cardToDeck').where({ id: cardId, deckId: from.id }).del();
  } else {
    await db('cardToWantsList')
      .where({ id: cardId, wantsListId: from.id })
      .del();
  }

  const updatedFrom = await getUpdatedList(from, db);
  const updatedTo = await getUpdatedList(to, db);

  return {
    from: updatedFrom,
    to: updatedTo,
  };
};
