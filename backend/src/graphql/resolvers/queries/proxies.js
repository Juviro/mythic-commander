import db from '../../../database';
import {
  canAccessWantsList,
  canAccessDeck,
} from '../../../auth/authenticateUser';
import { getImageKey } from './Card/helper';

const addImgKey = card => ({ ...card, imgKey: getImageKey(card) });

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

export default ({ type, id, filter }, userId) => {
  if (type === 'wants') return getWantProxies(id, filter, userId);
  if (type === 'deck') return getDeckProxies(id, filter, userId);

  throw new Error('Type not supported');
};
