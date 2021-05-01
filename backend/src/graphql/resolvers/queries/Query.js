import { getCachedCards, getCachedCardsBySet } from './getCachedCards';
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
import getEdhrecCards from './getEdhrecCards';

const resolver = {
  user(_, __, { db, user: { id } }) {
    if (!id) return null;

    return db('users')
      .where({ id })
      .first();
  },

  card(_, { id }, { db }) {
    return db('cards')
      .where({ id })
      .first();
  },
  cards(_, { cardIds }, { db }) {
    return db('cards').whereIn('id', cardIds);
  },
  async cardByOracleId(_, { oracle_id }, { db }) {
    const card = await db('distinctCards')
      .where({ oracle_id })
      .first();
    if (card) return card;

    return db('cards')
      .where({ oracle_id })
      .first();
  },

  async deck(_, { id }, { user, db }) {
    await canAccessDeck(user.id, id);

    return db('decks')
      .where({ id })
      .first();
  },
  decks(_, __, { user, db }) {
    if (!user.id) return null;
    return db('decks')
      .where({ userId: user.id })
      .orderBy('lastEdit', 'desc');
  },

  collection(_, __, { user: { id } }) {
    return { id };
  },

  edhrecCards(_, { names, themeSuffix }) {
    return getEdhrecCards(names, themeSuffix);
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

  cardsBySet: (_, { setKey }, { db }) => getCachedCardsBySet(db, setKey),
  cachedCards: (_, __, { db }) => getCachedCards(db),
  numberOfCachedCards: async (_, __, { db }) => {
    const { count } = await db('distinctCards')
      .count('*')
      .first();
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
        if (card_faces)
          return card_faces.map(cardFace => cardFace.image_uris.art_crop);
        return image_uris.art_crop;
      })
      .map(artCrop => artCrop.split('?')[0].replace(/\$.+$/, ''))
      .flat();
  },

  cardSearch,

  async wantsList(_, { id }, { user: { id: userId }, db }) {
    await canAccessWantsList(userId, id);

    return db('wantsLists')
      .where({ id })
      .first();
  },

  wantsLists(_, { deckId }, { user: { id: userId }, db }) {
    if (!userId) return null;
    const where = { userId };
    if (deckId) where.deckId = deckId;

    return db('wantsLists')
      .where(where)
      .orderBy('createdAt', 'asc');
  },
  async collectionSnapshots(_, __, { user: { id: userId }, db }) {
    if (!userId) return [];

    return db('collectionSnapshot')
      .where({ userId })
      .orderBy('date');
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

    const decks = db('decks')
      .where({ userId })
      .orderBy('name', 'asc');

    return {
      decks,
      wantsLists,
    };
  },

  ltPlayers(_, __, { user: { id: userId }, db }) {
    if (!userId) return null;

    return db('ltPlayers')
      .where({ userId })
      .orderBy('lastEdit', 'DESC');
  },
};

export default resolver;
