import db from '../../../../database';
import { canEditDeck } from '../../../../auth/authenticateUser';

interface LandsSuggestionOptions {
  numberOfLands: number;
  onwnedLandsOnly: boolean;
  minNumberOfBasics: number;
}

const getColorIdentity = async (deckId: string) => {
  const { rows: colorIdentities } = await db.raw(
    `
        SELECT color_identity
        FROM cards 
        LEFT JOIN "cardToDeck" 
            on "cardToDeck".id = cards.id
        WHERE 
            "deckId" = ?
            AND "isCommander" = true;
    `,
    [deckId]
  );
  const colorIdentity = colorIdentities
    .map(({ color_identity }) => color_identity)
    .flat();
  return [...new Set(colorIdentity)];
};

const getLandsSuggestion = async (
  deckId: string,
  options: LandsSuggestionOptions,
  userId: string
) => {
  await canEditDeck(userId, deckId);

  const colorIdentity = await getColorIdentity(deckId);
  console.log('colorIdentity', colorIdentity);

  return {
    groups: [],
  };
};

export default getLandsSuggestion;
