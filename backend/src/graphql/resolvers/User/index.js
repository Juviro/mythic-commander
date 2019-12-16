export default {
  Query: {
    user: async (_, test, { user, db }) => {
      const [dbUser] = await db('users').where({ id: user.id })
      return dbUser
    },
  },
}
