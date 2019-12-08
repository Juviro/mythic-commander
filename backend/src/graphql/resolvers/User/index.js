export default {
  Query: {
    user: async (_, _1, { user, db }) => {
      const [dbUser] = await db('users')
      if (!dbUser) {
        await db('users').insert({ id: user.id, name: user.name })
      }
      return user
    },
  },
}
