export default {
  Query: {
    user: async (_, _1, { user, db }) => {
      try {
        const [dbUser] = await db('users')
        if (!dbUser) {
          await db('users').insert({ id: user.id, name: user.name })
        }
        return user
      } catch (e) {
        console.log('error fetching user', e)
      }
    },
  },
}
