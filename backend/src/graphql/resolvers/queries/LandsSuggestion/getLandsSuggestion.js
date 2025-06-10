import { canEditDeck } from '../../../../auth/authenticateUser';
import { getCards, getColorIdentity } from './landSuggestionHelpers';

const getLandsSuggestion = async (deckId, options, userId) => {
  console.log('deckId, userId', deckId, userId);
  await canEditDeck(userId, deckId);

  const {
    numberOfLands = 37,
    ownedLandsOnly = true,
    minNumberOfBasics = 2,
  } = options;

  // eslint-disable-next-line no-unused-vars
  const colorIdentity = await getColorIdentity(deckId);
  // eslint-disable-next-line no-unused-vars
  const cards = await getCards(deckId);

  console.log('colorIdentity', colorIdentity);
  console.log('cards', cards.length);
  return {
    groups: [],
  };
};

export default getLandsSuggestion;
