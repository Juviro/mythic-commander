import { getCachedCards } from './helpers/getCachedCards';
import cardSearch from './helpers/cardSearch';
import proxies from './helpers/proxies';
import unifyCardFormat from '../unifyCardFormat';
import paginatedCollection from './helpers/paginatedCollection';
import {
  canAccessDeck,
  canAccessWantsList,
  isCollectionPublic,
  throwAuthError,
} from '../../../auth/authenticateUser';
import wantedCards from './helpers/wantedCards';
import tokenFinder from './helpers/tokenFinder';
import getEdhrecCards from './helpers/getEdhrecCards';
import getLandsSuggestion from './LandsSuggestion/getLandsSuggestion';
import tokens from './helpers/tokens';
import collectionBySet from './helpers/collectionBySet';
import { VARIANTS } from './Card/cardVariants';
import searchUsers from './Friends/searchUsers';
import getFriends from './Friends/getFriends';
import userPage from './User/userPage';

const resolver = {
  async user(_, __, { db, user: { id } }) {
    if (!id) return null;

    const user = await db('users').where({ id }).first();
    const { count: openFriendRequests } = await db('friends')
      .where({ toUserId: id, accepted: false })
      .count('fromUserId')
      .first();

    return {
      ...user,
      openFriendRequests,
    };
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
    if (!user.id) {
      throwAuthError();
    }

    return db('decks')
      .leftJoin('deckColors', { 'decks.id': 'deckColors.deckId' })
      .where({ userId: user.id })
      .orderBy('lastEdit', 'desc');
  },

  collection(_, __, { user: { id } }) {
    return { id };
  },

  async priceDevelopment(_, { cardId, currency }, { db }) {
    const { entries } = await db('cardPrices').where({ id: cardId }).first();

    let hasData = false;

    return entries
      .map((entry) => ({
        date: entry.date,
        price: entry[`price${currency}`],
      }))
      .filter((price) => {
        // Remove all empty entries at the start of the array until we find an entry with data
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

  landsSuggestion(_, { deckId, options }, { user: { id: userId } }) {
    return getLandsSuggestion(deckId, options, userId);
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
    if (!userId) return [];
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

  searchUsers,
  friends: getFriends,
  userPage,

  ltPlayers(_, __, { user: { id: userId }, db }) {
    if (!userId) return null;

    return db('ltPlayers').where({ userId }).orderBy('lastEdit', 'DESC');
  },

  cardVariants: () => {
    return Object.values(VARIANTS).sort((a, b) => a.localeCompare(b));
  },

  async landCycleFavorites(_, __, { user: { id: userId }, db }) {
    if (!userId) return [];

    const favorites = await db('landCycleFavorites')
      .where({ userId })
      .select('landCycleId');

    return favorites.map(({ landCycleId }) => landCycleId);
  },
};

export default resolver;
