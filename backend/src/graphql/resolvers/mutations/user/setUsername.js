import { ValidationError } from 'apollo-server-koa';

export default async (_, { username }, { user: { id }, db }) => {
  if (!username || !username.match(/^[A-z0-9-_]{4,25}$/)) {
    throw new ValidationError('Forbidden characters used');
  }

  try {
    const [user] = await db('users')
      .where({ id })
      .update({ username })
      .returning('*');

    return user;
  } catch {
    throw new Error('This username is already taken');
  }
};
