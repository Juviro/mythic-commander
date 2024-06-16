import { canEditDeck } from '../../../../auth/authenticateUser';
import { getCards, getColorIdentity } from './landSuggestionHelpers';

const getLandsSuggestion = async (deckId, options, userId) => {
  await canEditDeck(userId, deckId);

  const colorIdentity = await getColorIdentity(deckId);
  const cards = await getCards(deckId);

  return {
    groups: [],
  };
};

export default getLandsSuggestion;
