import randomId from '../../../../utils/randomId';

export default async (_, __, { user: { id: userId }, db }) => {
  const [deck] = await db('decks')
    .insert({ userId, id: randomId() })
    .returning('*');

  return deck;
};
