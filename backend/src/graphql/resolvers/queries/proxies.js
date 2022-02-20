import db from '../../../database';
import {
  canAccessWantsList,
  canAccessDeck,
} from '../../../auth/authenticateUser';
import { getImageKey } from './Card/helper';
import tokenFinder from './tokenFinder';

const addImgKey = card => ({
  ...card,
  imgKey: getImageKey(card),
  isTwoFaced: !card.image_uris,
});

const getWantProxies = async (id, filter, userId) => {
  await canAccessWantsList(userId, id);

  if (filter === 'unowned-only') {
    const { rows: cards } = await db.raw(
      `
        WITH _collection AS (
            SELECT * FROM "collectionWithOracle" WHERE "userId" = ?
        )
        SELECT "cardToWantsListWithOracle".amount, cards.* 
        FROM "cardToWantsListWithOracle" 
        LEFT JOIN _collection 
            ON "cardToWantsListWithOracle".oracle_id = _collection.oracle_id
        LEFT JOIN cards
            ON "cardToWantsListWithOracle".id = cards.id
        WHERE "cardToWantsListWithOracle"."wantsListId" = ?
        AND _collection.oracle_id IS NULL;
      `,
      [userId, id]
    );
    return cards.map(addImgKey);
  }

  const cards = await db('cardToWantsList')
    .leftJoin('cards', {
      'cardToWantsList.id': 'cards.id',
    })
    .where({ wantsListId: id });

  return cards.map(addImgKey);
};

const getDeckProxies = async (id, filter, userId) => {
  await canAccessDeck(userId, id);

  if (filter === 'unowned-only') {
    const { rows: cards } = await db.raw(
      `
        WITH _collection AS (
            SELECT * FROM "collectionWithOracle" WHERE "userId" = ?
        )
        SELECT "cardToDeckWithOracle".amount, cards.* 
        FROM "cardToDeckWithOracle" 
        LEFT JOIN _collection 
            ON "cardToDeckWithOracle".oracle_id = _collection.oracle_id
        LEFT JOIN cards
            ON "cardToDeckWithOracle".id = cards.id
        WHERE "cardToDeckWithOracle"."deckId" = ?
        AND _collection.oracle_id IS NULL;
      `,
      [userId, id]
    );
    return cards.map(addImgKey);
  }

  const cards = await db('cardToDeck')
    .leftJoin('cards', {
      'cardToDeck.id': 'cards.id',
    })
    .where({ deckId: id });

  return cards.map(addImgKey);
};

const getCardProxies = async cardIds => {
  const cards = await db('cards').whereIn('id', cardIds.split(','));

  return cards.map(addImgKey);
};

const getTokens = async userId => {
  const cards = await tokenFinder(userId);
  return cards.map(addImgKey);
};

export default ({ type, value, filter }, userId) => {
  if (type === 'wants') return getWantProxies(value, filter, userId);
  if (type === 'deck') return getDeckProxies(value, filter, userId);
  if (type === 'cards') return getCardProxies(value);
  if (type === 'tokens') return getTokens(userId);

  throw new Error('Type not supported');
};
