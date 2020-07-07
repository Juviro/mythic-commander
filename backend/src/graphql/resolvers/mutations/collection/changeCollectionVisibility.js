export default async (_, { visibility }, { user: { id: userId }, db }) => {
  await db.raw(
    `? ON CONFLICT ("userId")
            DO UPDATE SET
            visibility = EXCLUDED.visibility;`,
    [db('collectionVisibility').insert({ visibility, userId })]
  );

  return {
    id: userId,
    visibility,
  };
};
