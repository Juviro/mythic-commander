import { isCollectionPublic } from '../../../auth/authenticateUser';
import { getImageKey } from './Card/helper';

const getCollection = async (db, userId) => {
  const oracleIds = await db('collectionWithOracle')
    .distinct('oracle_id')
    .where({ userId });

  return oracleIds.map(({ oracle_id }) => oracle_id);
};

const formatCards = ({ id, name, oracle_id, ...rest }) => ({
  id,
  name,
  oracle_id,
  imgKey: getImageKey(rest),
});

const formatList = ({ cards, ...rest }) => ({
  ...rest,
  cards: cards.map(formatCards),
});

const getUnownedDeckCards = async (
  db,
  ownUserId,
  collectionOracleIds,
  ownedOracleIds
) => {
  const ownDeckIds = (
    await db('decks')
      .select('id')
      .where({ userId: ownUserId })
  ).map(({ id }) => id);

  return db('cardToDeckWithOracle')
    .select(
      'decks.name',
      'decks.id',
      db.raw('JSON_AGG("distinctCards") as cards')
    )
    .leftJoin('decks', 'decks.id', 'cardToDeckWithOracle.deckId')
    .leftJoin(
      'distinctCards',
      'distinctCards.oracle_id',
      'cardToDeckWithOracle.oracle_id'
    )
    .whereIn('deckId', ownDeckIds)
    .whereIn('cardToDeckWithOracle.oracle_id', collectionOracleIds)
    .whereNotIn('cardToDeckWithOracle.oracle_id', ownedOracleIds)
    .groupBy('decks.id', 'decks.name');
};

const getUnownedWantsListCards = async (
  db,
  ownUserId,
  collectionOracleIds,
  ownedOracleIds
) => {
  const ownWantsListIds = (
    await db('wantsLists')
      .select('id')
      .where({ userId: ownUserId })
  ).map(({ id }) => id);

  return db('cardToWantsListWithOracle')
    .select(
      'wantsLists.name',
      'wantsLists.id',
      db.raw('JSON_AGG("distinctCards") as cards')
    )
    .leftJoin(
      'wantsLists',
      'wantsLists.id',
      'cardToWantsListWithOracle.wantsListId'
    )
    .leftJoin(
      'distinctCards',
      'distinctCards.oracle_id',
      'cardToWantsListWithOracle.oracle_id'
    )
    .whereIn('wantsListId', ownWantsListIds)
    .whereIn('cardToWantsListWithOracle.oracle_id', collectionOracleIds)
    .whereNotIn('cardToWantsListWithOracle.oracle_id', ownedOracleIds)
    .groupBy('wantsLists.id', 'wantsLists.name');
};

export default async (db, collectionUsername, ownUserId) => {
  const { id: collectionUserId } = await db('users')
    .where('username', 'ILIKE', collectionUsername)
    .select('id')
    .first();
  await isCollectionPublic(collectionUserId);

  const collectionOracleIds = await getCollection(db, collectionUserId);
  const ownedOracleIds = await getCollection(db, ownUserId);

  const unownedDeckCards = await getUnownedDeckCards(
    db,
    ownUserId,
    collectionOracleIds,
    ownedOracleIds
  );
  const unownedWantsListCards = await getUnownedWantsListCards(
    db,
    ownUserId,
    collectionOracleIds,
    ownedOracleIds
  );

  return {
    decks: unownedDeckCards.map(formatList),
    wantsLists: unownedWantsListCards.map(formatList),
  };
};
