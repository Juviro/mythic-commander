export const up = async knex => {
  await knex.schema.raw('DROP VIEW "cardToDeckWithOracle"');

  await knex.schema.raw(
    'ALTER TABLE "wantsLists" DROP CONSTRAINT wantslists_deckid_foreign;'
  );
  await knex.schema.raw(
    'ALTER TABLE "cardToDeck" DROP CONSTRAINT cardtodeck_deckid_foreign;'
  );
  await knex.schema.raw(
    'ALTER TABLE "wantsLists" ALTER COLUMN "deckId" TYPE varchar;'
  );
  await knex.schema.raw(
    'ALTER TABLE "cardToDeck" ALTER COLUMN "deckId" TYPE varchar;'
  );
  await knex.schema.raw('ALTER TABLE decks ALTER COLUMN id TYPE varchar;');
  await knex.schema.raw(
    'ALTER TABLE "wantsLists" ADD CONSTRAINT wantslists_deckid_foreign FOREIGN KEY ("deckId") REFERENCES decks(id);'
  );
  await knex.schema.raw(
    'ALTER TABLE "cardToDeck" ADD CONSTRAINT cardtodeck_deckid_foreign FOREIGN KEY ("deckId") REFERENCES decks(id);'
  );

  await knex.schema.raw(`
    CREATE VIEW "cardToDeckWithOracle" AS (
        SELECT "cardToDeck".*, cards.oracle_id
        FROM "cardToDeck"
        LEFT JOIN cards
        ON "cardToDeck".id = cards.id
    );
  `);
};

// eslint-disable-next-line
export const down = () => {};
