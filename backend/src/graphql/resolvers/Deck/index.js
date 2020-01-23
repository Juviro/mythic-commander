import { ValidationError } from 'apollo-server-koa';
import { pick } from 'lodash';

import { getCardsByName } from '../../../cardApi/';
import { addAdditionalProperties } from '../../../cardApi/internal';
import { canAccessDeck } from '../../../auth/authenticateUser';

const DEFAULT_ZONE = 'MAINBOARD';

const ON_DUPLICATE = ` ON CONFLICT ("deckId", "oracle_id") DO UPDATE SET "cardId"=EXCLUDED."cardId"`;

const getPopulatedCards = async (db, deckId) => {
  // TODO: this can now be simplified as cardToDeck now features the column oracle_id
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

const populateDeck = async (deck, db) => {
  const populatedCards = await getPopulatedCards(db, deck.id);
  const numberOfCards = populatedCards.reduce((acc, val) => acc + (Number(val.amount) || 1), 0);
  return { ...deck, numberOfCards, cards: populatedCards };
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
    editDeck: async (_, { newProperties: { imgSrc, name }, deckId }, { user, db }) => {
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

      const [deck] = await db('decks').where({ id: deckId });

      return populateDeck(deck, db);
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
        await updateLastEdit(deckId, db);
      }

      const [deck] = await db('decks').where({ userId: user.id, id: deckId });

      return populateDeck(deck, db);
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
