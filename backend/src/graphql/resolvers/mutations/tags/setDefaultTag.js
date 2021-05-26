import { hasFeatureFlag } from '../../../../auth/authenticateUser';

const ON_DUPLICATE = ` ON CONFLICT (oracle_id) DO UPDATE SET tags = "defaultTags".tags || EXCLUDED.tags`;

export default async (_, { tag, oracleId }, { user: { id: userId }, db }) => {
  await hasFeatureFlag(userId, 'TAG');

  const query = db('defaultTags').insert({ oracle_id: oracleId, tags: [tag] });

  await db.raw(query.toString() + ON_DUPLICATE);
  return true;
};
