import { hasFeatureFlag } from '../../../../auth/authenticateUser';
import storeCardImage from '../../../../cardApi/images/storeCardImage';

const updateCardImages = async (
  _,
  { cardId },
  { user: { id: userId }, db }
) => {
  await hasFeatureFlag(userId, 'UPDATE_CARDS');

  const card = await db('cards').where({ id: cardId }).first();

  await storeCardImage(card, true);

  return true;
};

export default updateCardImages;
