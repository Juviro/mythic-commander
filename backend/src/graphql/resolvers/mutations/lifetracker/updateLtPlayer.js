const ON_DUPLICATE =
  ' ON CONFLICT ("userId", name) DO UPDATE SET img = EXCLUDED.img, color = EXCLUDED.color, "lastEdit" = NOW()';

export default async (
  _,
  { name, img, color },
  { user: { id: userId }, db }
) => {
  const query = db('ltPlayers').insert({ name, img, color, userId });

  await db.raw(query.toString() + ON_DUPLICATE);

  return db('ltPlayers')
    .where({ name, userId })
    .first();
};
