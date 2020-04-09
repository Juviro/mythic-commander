import {
  canAccessDeck,
  canAccessWantsList,
} from '../../../../auth/authenticateUser';

const DECK = 'DECK';
const WANTS = 'WANTS_LIST';

const typeToRelation = {
  [DECK]: 'decks',
  [WANTS]: 'wantsLists',
};

const canAccess = (userId, { id, type }) =>
  type === DECK ? canAccessDeck(userId, id) : canAccessWantsList(userId, id);

const getUpdatedList = ({ type, id }, db) =>
  db(typeToRelation[type])
    .where({ id })
    .first();

export default async (
  _,
  { cardId, from, to },
  { user: { id: userId }, db }
) => {
  await canAccess(userId, from);
  await canAccess(userId, to);

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

  if (to.type === DECK) {
    await db('cardToDeck').insert({ ...currentCard, deckId: to.id });
  } else {
    await db('cardToWantsList').insert({ ...currentCard, wantsListId: to.id });
  }

  if (from.type === DECK) {
    await db('cardToDeck')
      .where({ id: cardId, deckId: from.id })
      .del();
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
