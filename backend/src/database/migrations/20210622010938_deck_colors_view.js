export const up = async knex => {
  await knex.schema.raw(`
    CREATE VIEW "deckColors" AS 
    WITH cards AS (
        SELECT * FROM "cardToDeck" LEFT JOIN cards ON cards.id = "cardToDeck".id
    ) 
    SELECT array_agg(DISTINCT CI) as colors, "deckId" FROM cards, unnest(cards.color_identity) as CI 
    GROUP BY "cards"."deckId";`);
};

export const down = async knex => {
  await knex.schema.raw(`
      DROP VIEW "deckColors"
    `);
};
