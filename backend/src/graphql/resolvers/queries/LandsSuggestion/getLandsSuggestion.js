import { canEditDeck } from '../../../../auth/authenticateUser';
import { landSuggestions } from './landSuggestion';
import {
  getCards,
  getColorIdentity,
  getLandCycles,
  getGroupsWithCurrentLands,
  getLandCycleFavorites,
  getManaPipsByColor,
  getCardVersions,
  getGroupsWithDefaultCardVersions,
} from './landSuggestionHelpers';

const getLandsSuggestion = async (deckId, options, userId) => {
  await canEditDeck(userId, deckId);

  const {
    numberOfLands = 37,
    ownedLandsOnly = true,
    minNumberOfBasics = 2,
  } = options || {};

  const landCycleFavorites = await getLandCycleFavorites(userId);
  const colorIdentity = await getColorIdentity(deckId);
  const cards = await getCards(deckId);
  const manaPipsByColor = await getManaPipsByColor(cards);

  const landCycles = await getLandCycles({
    colorIdentity,
    ownedLandsOnly,
    userId,
    landCycleFavorites,
  });

  const groupsWithCurrentLands = getGroupsWithCurrentLands(landCycles, cards);

  const groupsWithSelectedLands = landSuggestions({
    numberOfLands,
    minNumberOfBasics,
    colorIdentity,
    manaSymbolCount: manaPipsByColor,
    groups: groupsWithCurrentLands,
  });

  const allOracleIds = groupsWithSelectedLands.flatMap((group) =>
    group.lands.map((land) => land.oracle_id)
  );
  const defaultCardVersions = await getCardVersions(allOracleIds, userId);
  const groupsWithDefaultCardVersions = getGroupsWithDefaultCardVersions(
    groupsWithSelectedLands,
    defaultCardVersions,
    cards
  );

  return {
    groups: groupsWithDefaultCardVersions,
  };
};

export default getLandsSuggestion;
