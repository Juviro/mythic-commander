export default async (_, { name }, { user: { id: userId }, db }) => {
  await db('ltPlayers').where({ name, userId }).delete();

  return true;
};
