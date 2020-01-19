import { ValidationError } from 'apollo-server-koa';
import { pick } from 'lodash';

import { getCardsByName } from '../../../cardApi/';
import { addAdditionalProperties } from '../../../cardApi/internal';
import { canAccessDeck } from '../../../auth/authenticateUser';

const DEFAULT_ZONE = 'MAINBOARD';

const ON_DUPLICATE = ` ON CONFLICT ("deckId", "oracle_id") DO UPDATE SET "cardId"=EXCLUDED."cardId"`;

const getPopulatedCards = async (db, deckId) => {
  const { rows: populatedCards } = await db.raw(
    `
  SELECT "cardToDeck".zone, cards.*, "cardsBySet".all_sets, CASE WHEN owned.oracle_id IS NULL THEN NULL ELSE 1 END AS owned
    FROM "cardToDeck" 
  LEFT JOIN cards 
    ON "cardToDeck"."cardId" = cards.id 
  LEFT JOIN "cardsBySet" 
    ON "cardToDeck"."oracle_id" = "cardsBySet".oracle_id 
  LEFT JOIN (SELECT DISTINCT oracle_id FROM collection LEFT JOIN cards ON collection.id = cards.id) owned
    ON cards.oracle_id = owned.oracle_id
  WHERE "deckId" = ?`,
    deckId
  );
  return populatedCards.map(addAdditionalProperties);
};

const updateLastEdit = (deckId, db) =>
  db('decks')
    .where({ id: deckId })
    .update({
      lastEdit: new Date(),
    });

export default {
  Query: {
    decks: async (_, _1, { user, db }) => {
      const decks = await db('decks').where({ userId: user.id });
      return decks;
    },
    deck: async (_, { id }, { user, db }) => {
      const [deck] = await db('decks').where({ userId: user.id, id });
      const populatedCards = await getPopulatedCards(db, deck.id);

      return { ...deck, cards: populatedCards };
    },
  },
  Mutation: {
    createDeck: async (_, _1, { user, db }) => {
      const [deckId] = await db('decks')
        .insert({ userId: user.id })
        .returning('id');
      const [deck] = await db('decks').where({ id: deckId });
      return deck;
    },
    editDeck: async (_, { newProperties: { imgSrc, name }, deckId }, { user, db }) => {
      await db('decks')
        .where({ userId: user.id, id: deckId })
        .update({
          imgSrc,
          name,
          lastEdit: new Date(),
        });
      const [updatedDeck] = await db('decks').where({ id: deckId });
      const populatedCards = await getPopulatedCards(db, deckId);

      return { ...updatedDeck, cards: populatedCards };
    },
    addCardsToDeck: async (_, { input: { cards: cardNames, deckId } }, { user, db }) => {
      const isAuthenticated = (await db('decks').where({ userId: user.id, id: deckId })).length;
      if (!isAuthenticated) throw new ValidationError('Not authenticated');

      const cards = await getCardsByName(cardNames);

      const cardsToInsert = cards.map(({ id: cardId, oracle_id }) => ({
        deckId,
        cardId,
        oracle_id,
        zone: DEFAULT_ZONE,
      }));
      const query = db('cardToDeck')
        .insert(cardsToInsert)
        .toString();

      await db.raw(query + ON_DUPLICATE);
      await updateLastEdit(deckId, db);

      const populatedCards = await getPopulatedCards(db, deckId);
      const [deck] = await db('decks').where({ id: deckId });

      return {
        ...deck,
        cards: populatedCards,
      };
    },
    editDeckCard: async (_, { cardOracleId, deckId, newProps }, { user, db }) => {
      await canAccessDeck(user.id, deckId);

      const updatedProps = pick(newProps, ['zone', 'amount']);
      if (newProps.set) {
        const [{ id }] = await db('cards')
          .where({ oracle_id: cardOracleId, set: newProps.set })
          .select('id');
        updatedProps.cardId = id;
      }

      if (Object.prototype.hasOwnProperty.call(newProps, 'owned')) {
        const { owned } = newProps;
        const [deckCard] = await db('cardToDeck').where({ deckId, oracle_id: cardOracleId });
        if (!owned) {
          await db('collection')
            .where({ id: deckCard.cardId })
            .del();
        } else {
          const [{ set }] = await db('cards')
            .where({ id: deckCard.cardId })
            .select('set');
          await db('collection').insert({
            id: deckCard.cardId,
            isFoil: false,
            set,
            userId: user.id,
            amount: 1,
          });
        }
      }

      if (Object.keys(updatedProps).length) {
        await db('cardToDeck')
          .where({ oracle_id: cardOracleId, deckId })
          .update(updatedProps);
      }

      await updateLastEdit(deckId, db);

      const [deck] = await db('decks').where({ userId: user.id, id: deckId });
      const populatedCards = await getPopulatedCards(db, deck.id);

      return { ...deck, cards: populatedCards };
    },
    deleteFromDeck: async (_, { cardId, deckId }, { user, db }) => {
      await canAccessDeck(user.id, deckId);

      await db('cardToDeck')
        .where({ cardId, deckId })
        .del();

      await updateLastEdit(deckId, db);

      const [deck] = await db('decks').where({ userId: user.id, id: deckId });
      const populatedCards = await getPopulatedCards(db, deck.id);

      return { ...deck, cards: populatedCards };
    },
    deleteDeck: async (_, { deckId }, { user, db }) => {
      await canAccessDeck(user.id, deckId);

      await db('decks')
        .where({ id: deckId })
        .del();

      return true;
    },
  },
};
