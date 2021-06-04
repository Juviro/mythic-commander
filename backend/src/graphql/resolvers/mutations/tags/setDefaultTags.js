import { hasFeatureFlag } from '../../../../auth/authenticateUser';

const ON_DUPLICATE = ` ON CONFLICT (oracle_id) DO UPDATE SET tags = EXCLUDED.tags`;

export default async (_, { tags, oracleId }, { user: { id: userId }, db }) => {
  await hasFeatureFlag(userId, 'TAG');

  const query = db('defaultTags').insert({ oracle_id: oracleId, tags });

  await db.raw(query.toString() + ON_DUPLICATE);
  return true;
};
