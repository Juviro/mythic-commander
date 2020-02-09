import { ValidationError } from 'apollo-server-koa';
import { pick } from 'lodash';

import { populateCardsByName } from '../../../cardApi/';
import { addAdditionalProperties } from '../../../cardApi/internal';
import { canAccessDeck } from '../../../auth/authenticateUser';

const DEFAULT_ZONE = 'MAINBOARD';

const ON_DUPLICATE = ` ON CONFLICT ("deckId", "oracle_id") DO UPDATE SET amount = "cardToDeck".amount + EXCLUDED.amount, "cardId"=EXCLUDED."cardId"`;

const getPopulatedCards = async (db, deckId, cardOracleId) => {
  // TODO: improve performance of this query
  let query = `
    SELECT "cardToDeck".zone, "cardToDeck".amount, cards.*, "cardsBySet".all_sets, CASE WHEN collection.oracle_id IS NULL THEN NULL ELSE 1 END AS owned
      FROM "cardToDeck" 
    LEFT JOIN "cards" 
      ON "cardToDeck"."cardId" = cards.id
    LEFT JOIN "cardsBySet" 
      ON "cardToDeck"."oracle_id" = "cardsBySet".oracle_id 
    LEFT JOIN (SELECT COUNT(*) as owned, oracle_id FROM collection GROUP BY oracle_id) collection
      ON cards.oracle_id = collection.oracle_id
    WHERE "deckId" = ?
  `;
  const params = [deckId];

  if (cardOracleId) {
    query += ` AND "cardToDeck".oracle_id = ?`;
    params.push(cardOracleId);
  }

  const { rows: populatedCards } = await db.raw(query, params);
  return populatedCards.map(addAdditionalProperties);
};

export const populateDeck = async (deck, db) => {
  const populatedCards = await getPopulatedCards(db, deck.id);
  return { ...deck, cards: populatedCards };
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
      const decks = await db('decks')
        .where({ userId: user.id })
        .orderBy('lastEdit', 'DESC');

      return decks.map(deck => ({ ...deck, cards: [] }));
    },
    deck: async (_, { id }, { user, db }) => {
      const [deck] = await db('decks').where({ userId: user.id, id });

      return populateDeck(deck, db);
    },
  },
  Mutation: {
    createDeck: async (_, _1, { user, db }) => {
      const [deckId] = await db('decks')
        .insert({ userId: user.id })
        .returning('id');
      const [deck] = await db('decks').where({ id: deckId });

      return populateDeck(deck, db);
    },
    editDeck: async (
      _,
      { newProperties: { imgSrc, name }, deckId },
      { user, db }
    ) => {
      await db('decks')
        .where({ userId: user.id, id: deckId })
        .update({
          imgSrc,
          name,
          lastEdit: new Date(),
        });
      const [updatedDeck] = await db('decks').where({ id: deckId });

      return populateDeck(updatedDeck, db);
    },
    addCardsToDeck: async (_, { input: { cards, deckId } }, { user, db }) => {
      const isAuthenticated = (
        await db('decks').where({ userId: user.id, id: deckId })
      ).length;
      if (!isAuthenticated) throw new ValidationError('Not authenticated');

      const populatedCards = await populateCardsByName(cards);

      const cardsToInsert = populatedCards.map(
        ({ id: cardId, oracle_id, amount }) => ({
          deckId,
          amount,
          cardId,
          oracle_id,
          zone: DEFAULT_ZONE,
        })
      );

      const query = db('cardToDeck')
        .insert(cardsToInsert)
        .toString();

      await db.raw(query + ON_DUPLICATE);
      await updateLastEdit(deckId, db);

      const [deck] = await db('decks').where({ id: deckId });

      return populateDeck(deck, db);
    },
    editDeckCard: async (
      _,
      { cardOracleId, deckId, newProps },
      { user, db }
    ) => {
      await canAccessDeck(user.id, deckId);

      const updatedProps = pick(newProps, ['zone', 'amount']);
      if (newProps.id) {
        updatedProps.cardId = newProps.id;
      }

      if (Object.prototype.hasOwnProperty.call(newProps, 'owned')) {
        const { owned } = newProps;
        const [deckCard] = await db('cardToDeck').where({
          deckId,
          oracle_id: cardOracleId,
        });
        if (!owned) {
          await db.raw(
            `
          DELETE FROM collection 
          WHERE id IN(
            SELECT id FROM cards WHERE oracle_id = (
              SELECT oracle_id FROM cards 
                WHERE id=?
              )
            )
          `,
            deckCard.cardId
          );
        } else {
          await db('collection').insert({
            id: deckCard.cardId,
            isFoil: false,
            oracle_id: cardOracleId,
            userId: user.id,
            amount: 1,
          });
        }
      }

      if (Object.keys(updatedProps).length) {
        await db('cardToDeck')
          .where({ oracle_id: cardOracleId, deckId })
          .update(updatedProps);
        await updateLastEdit(deckId, db);
      }

      const [populatedCard] = await getPopulatedCards(db, deckId, cardOracleId);

      return populatedCard;
    },
    deleteFromDeck: async (_, { cardId, deckId }, { user, db }) => {
      await canAccessDeck(user.id, deckId);

      await db('cardToDeck')
        .where({ cardId, deckId })
        .del();

      await updateLastEdit(deckId, db);

      const [deck] = await db('decks').where({ userId: user.id, id: deckId });

      return populateDeck(deck, db);
    },
    deleteDeck: async (_, { deckId }, { user, db }) => {
      await canAccessDeck(user.id, deckId);

      await db('decks')
        .where({ id: deckId })
        .del();

      return true;
    },
    duplicateDeck: async (_, { deckId }, { user, db }) => {
      await canAccessDeck(user.id, deckId);

      const {
        rows: [{ id: newDeckId }],
      } = await db.raw(
        `
        INSERT INTO decks 
          ("userId", name, "imgSrc", "lastEdit", "createdAt") 
        SELECT 
          "userId", CONCAT(name, ' - Copy'), "imgSrc", NOW() as "lastEdit", NOW() as "createdAt" 
        FROM decks WHERE id=? RETURNING id
        `,
        deckId
      );

      await db.raw(
        `
        INSERT INTO "cardToDeck" 
          ("deckId", "cardId", zone, amount, oracle_id) 
        SELECT 
          ? as "deckId", "cardId", zone, amount, oracle_id
        FROM "cardToDeck" WHERE "deckId"=?
        `,
        [newDeckId, deckId]
      );

      return newDeckId;
    },
  },
};
