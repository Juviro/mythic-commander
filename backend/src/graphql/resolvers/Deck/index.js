import { ValidationError } from 'apollo-server-koa';

import { getCardsByName } from '../../../cardApi/';
import { addAdditionalProperties } from '../../../cardApi/internal';

const DEFAULT_ZONE = 'MAINBOARD';

const ON_DUPLICATE = ` ON CONFLICT ("deckId", "oracle_id") DO UPDATE SET "cardId"=EXCLUDED."cardId"`;

const getPopulatedCards = async (db, deckId) => {
  const { rows: populatedCards } = await db.raw(
    `
  SELECT "cardToDeck".zone, cards.*, CASE WHEN owned.oracle_id IS NULL THEN NULL ELSE 1 END AS owned
    FROM "cardToDeck" 
  LEFT JOIN cards 
    ON "cardToDeck"."cardId" = cards.id 
  LEFT JOIN (SELECT DISTINCT oracle_id FROM collection LEFT JOIN cards ON collection.id = cards.id) owned
    ON cards.oracle_id = owned.oracle_id
  WHERE "deckId" = ?`,
    deckId
  );
  return populatedCards.map(addAdditionalProperties);
};

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
      if (!isAuthenticated) throw new ValidationError('Deck not found');

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

      const populatedCards = await getPopulatedCards(db, deckId);

      return {
        cards: populatedCards,
        deckId,
      };
    },
  },
};
