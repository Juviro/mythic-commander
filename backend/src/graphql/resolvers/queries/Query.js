import { getCachedCards } from './getCachedCards';
import cardSearch from './cardSearch';
import proxies from './proxies';
import unifyCardFormat from '../unifyCardFormat';
import paginatedCollection from './paginatedCollection';
import {
  canAccessDeck,
  canAccessWantsList,
  isCollectionPublic,
} from '../../../auth/authenticateUser';
import wantedCards from './wantedCards';
import tokenFinder from './tokenFinder';
import getEdhrecCards from './getEdhrecCards';
import tokens from './tokens';
import collectionBySet from './collectionBySet';

const resolver = {
  user(_, __, { db, user: { id } }) {
    if (!id) return null;

    return db('users').where({ id }).first();
  },

  card(_, { id }, { db }) {
    return db('cards').where({ id }).first();
  },
  cards(_, { cardIds }, { db }) {
    return db('cards').whereIn('id', cardIds);
  },
  async cardByOracleId(_, { oracle_id }, { db }) {
    const card = await db('distinctCards').where({ oracle_id }).first();
    if (card) return card;

    return db('cards').where({ oracle_id }).first();
  },

  async deck(_, { id }, { user, db }) {
    await canAccessDeck(user.id, id);

    return db('decks').where({ id }).first();
  },

  decks(_, __, { user, db }) {
    if (!user.id) return null;
    return db('decks')
      .leftJoin('deckColors', { 'decks.id': 'deckColors.deckId' })
      .where({ userId: user.id })
      .orderBy('lastEdit', 'desc');
  },

  collection(_, __, { user: { id } }) {
    return { id };
  },

  async priceDevelopment(_, { cardId, currency }, { db }) {
    // Select 20 days rolling average as price to smooth out the curve
    const { rows: prices } = await db.raw(
      `
      SELECT c.date, c.id,
        round(AVG(c.??::numeric)
        OVER(ORDER BY c.date ROWS BETWEEN 20 PRECEDING AND CURRENT ROW), 2)
        AS price
        FROM "cardPrices" c WHERE id=?;
        `,
      [`price${currency}`, cardId]
    );

    let hasData = false;

    // Remove all empty entries at the start of the array until we find an entry with data
    return prices.filter((price) => {
      if (hasData) return true;
      if (price.price) {
        hasData = true;
        return true;
      }
      return false;
    });
  },

  edhrecCards(_, { names, themeSuffix }, { user: { id: userId } }) {
    return getEdhrecCards(names, themeSuffix, userId);
  },

  async ownedCardNames(_, __, { db, user: { id: userId } }) {
    if (!userId) return [];

    const cardNames = await db('collection')
      .leftJoin('cards', { 'cards.id': 'collection.id' })
      .distinct('name')
      .where({ userId });
    return cardNames.map(({ name }) => name);
  },
  wantedCards(_, { username }, { db, user: { id: userId } }) {
    return wantedCards(db, username, userId);
  },
  async paginatedCollection(
    _,
    { limit, offset, orderBy, search, username, addedWithin },
    { db, user: { id: userId } }
  ) {
    let collectionUserId = userId;

    if (username) {
      const { id } = await db('users')
        .where('username', 'ILIKE', username)
        .select('id')
        .first();
      collectionUserId = id;
      await isCollectionPublic(collectionUserId);
    } else if (!userId) {
      return null;
    }

    const cards = await paginatedCollection(
      db,
      collectionUserId,
      limit,
      offset,
      orderBy,
      search,
      addedWithin,
      !username
    );
    const amountUnique = cards.length ? cards[0].amountUnique : 0;
    const hasMore = amountUnique > limit + offset;

    return {
      hasMore,
      search,
      totalResults: amountUnique,
      cards: cards.map(unifyCardFormat(collectionUserId)),
      nextOffset: hasMore ? offset + limit : null,
    };
  },

  cardsBySet: async (_, { setKey }, { db }) => {
    const cards = await db('cards')
      .where({ set: setKey })
      .orderByRaw('name asc, is_special asc');

    // Only return one card per name without a primary_variant
    const noVariantCardNames = {};

    return cards.filter((card) => {
      if (card.primary_variant) return true;
      if (noVariantCardNames[card.name]) return false;
      noVariantCardNames[card.name] = true;
      return true;
    });
  },
  cachedCards: (_, __, { db }) => getCachedCards(db),
  numberOfCachedCards: async (_, __, { db }) => {
    const { count } = await db('distinctCards').count('*').first();
    return count;
  },
  cardImages: async (_, { cardId }, { db }) => {
    const { rows: imageUris } = await db.raw(
      `
      SELECT image_uris, card_faces FROM cards WHERE oracle_id = (
        SELECT oracle_id 
        FROM cards 
        WHERE id = ?
      );
    `,
      [cardId]
    );

    return imageUris
      .map(({ image_uris, card_faces }) => {
        if (card_faces) {
          return card_faces.map((cardFace) => cardFace.image_uris.art_crop);
        }
        return image_uris.art_crop;
      })
      .flat()
      .map((artCrop) => artCrop?.split('?')[0].replace(/\$.+$/, ''))
      .flat();
  },

  cardSearch,

  tokenFinder(_, __, { user: { id: userId } }) {
    return tokenFinder(userId);
  },

  tokens,

  async wantsList(_, { id }, { user: { id: userId }, db }) {
    await canAccessWantsList(userId, id);

    return db('wantsLists').where({ id }).first();
  },

  wantsLists(_, { deckId }, { user: { id: userId }, db }) {
    if (!userId) return null;
    const where = { userId };
    if (deckId) where.deckId = deckId;

    return db('wantsLists').where(where).orderBy('lastEdit', 'desc');
  },
  async collectionSnapshots(_, __, { user: { id: userId }, db }) {
    if (!userId) return [];

    return db('collectionSnapshot').where({ userId }).orderBy('date');
  },

  proxies(_, params, { user: { id: userId } }) {
    return proxies(params, userId);
  },

  async allLists(_, __, { user: { id: userId }, db }) {
    if (!userId) return null;
    const wantsLists = await db('wantsLists')
      .where({ userId })
      .orderBy('deckId', 'asc')
      .orderBy('name', 'asc');

    const decks = db('decks').where({ userId }).orderBy('name', 'asc');

    return {
      decks,
      wantsLists,
    };
  },

  collectionBySet,

  ltPlayers(_, __, { user: { id: userId }, db }) {
    if (!userId) return null;

    return db('ltPlayers').where({ userId }).orderBy('lastEdit', 'DESC');
  },
};

export default resolver;
