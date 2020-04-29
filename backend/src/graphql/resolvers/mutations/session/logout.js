export default async (_, { sessionId }, { user: { id: userId }, db }) => {
  await db('sessions')
    .where({ userId, sessionId })
    .del();

  return true;
};
