import { canEditDeck } from '../../../../auth/authenticateUser';
import { getCards, getColorIdentity } from './landSuggestionHelpers';

const getLandsSuggestion = async (deckId, options, userId) => {
  await canEditDeck(userId, deckId);

  // eslint-disable-next-line no-unused-vars
  const colorIdentity = await getColorIdentity(deckId);
  // eslint-disable-next-line no-unused-vars
  const cards = await getCards(deckId);

  return {
    groups: [],
  };
};

export default getLandsSuggestion;
