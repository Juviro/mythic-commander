import { getCardsByName } from '../../../cardApi/getCards'
import populateCards from '../../../cardApi/populateCards'
import { async } from 'rxjs/internal/scheduler/async'

export default {
  Query: {
    collection: async (_, _1, { user, db }) => {
      const collection = await db('collection').where({ userId: user.id })
      return populateCards(collection)
    },
  },
  Mutation: {
    addToCollectionById: async (_, { cards }, { user, db }) => {
      const withUserId = cards.map(card => ({ ...card, userId: user.id, amount: 1 }))

      const onDuplicate = 'ON DUPLICATE KEY UPDATE amount = amount + 1'

      await db.raw(
        db('collection')
          .insert(withUserId)
          .toString() + onDuplicate
      )

      return populateCards(cards)
    },
    addToCollectionByName: async (_, { cards: cardNames }, { user, db }) => {
      const cards = await getCardsByName(cardNames.map(({ name }) => name))
      const withUserId = cards.map(({ id, set }) => ({ id, isFoil: false, set, userId: user.id, amount: 1 }))

      const onDuplicate = 'ON DUPLICATE KEY UPDATE amount = amount + 1'

      await db.raw(
        db('collection')
          .insert(withUserId)
          .toString() + onDuplicate
      )

      return cards.map(card => ({ ...card, isFoil: false, userId: user.id, createdAt: new Date() }))
    },
    deleteFromCollection: async (_, { cardId }, { user, db }) => {
      await db('collection')
        .where({ id: cardId })
        .del()
      return cardId
    },
  },
}
