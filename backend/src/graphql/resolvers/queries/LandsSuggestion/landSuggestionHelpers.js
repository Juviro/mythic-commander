import db from '../../../../database';

export const getColorIdentity = async (deckId) => {
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

export const getCards = async (deckId) => {
  const { rows: cards } = await db.raw(
    `
    SELECT 
        "cardToDeck".amount, 
        cards.name,
        cards.mana_cost,
        cards.produced_mana
    FROM cards
    LEFT JOIN "cardToDeck"
        on "cardToDeck".id = cards.id
    WHERE 
        "deckId" = ?
        `,
    [deckId]
  );

  return cards;
};
