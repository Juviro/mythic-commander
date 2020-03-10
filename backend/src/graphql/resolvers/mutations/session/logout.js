export default async (_, __, { user, db, session }) => {
  await db('sessions')
    .where({ id: user.id })
    .del();

  return session;
};
