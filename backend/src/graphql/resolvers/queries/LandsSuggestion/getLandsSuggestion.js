import db from '../../../../database';
import { canEditDeck } from '../../../../auth/authenticateUser';

const getColorIdentity = async (deckId) => {
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

const getLandsSuggestion = async (deckId, options, userId) => {
  await canEditDeck(userId, deckId);

  // eslint-disable-next-line no-unused-vars
  const colorIdentity = await getColorIdentity(deckId);

  return {
    groups: [],
  };
};

export default getLandsSuggestion;
