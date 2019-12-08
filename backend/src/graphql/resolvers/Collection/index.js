export default {
  Query: {
    collection: async (_, _1, { user, db }) => {
      const collection = await db('collection').where({ userId: user.id })
      return collection
    },
  },
  Mutation: {
    addToCollection: async (_, { cards }, { user, db }) => {
      const withUserId = cards.map(card => ({ ...card, userId: user.id, amount: 1 }))

      const onDuplicate = 'ON DUPLICATE KEY UPDATE amount = amount + 1'

      await db.raw(
        db('collection')
          .insert(withUserId)
          .toString() + onDuplicate
      )

      return cards
    },
  },
}
