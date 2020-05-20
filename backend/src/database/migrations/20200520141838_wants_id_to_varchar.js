export const up = async knex => {
  await knex.schema.raw('DROP VIEW "cardToWantsListWithOracle"');

  await knex.schema.raw(
    'ALTER TABLE "cardToWantsList" DROP CONSTRAINT cardtowantslist_wantslistid_foreign;'
  );
  await knex.schema.raw(
    'ALTER TABLE "cardToWantsList" ALTER COLUMN "wantsListId" TYPE varchar;'
  );
  await knex.schema.raw(
    'ALTER TABLE "wantsLists" ALTER COLUMN id TYPE varchar;'
  );
  await knex.schema.raw(
    'ALTER TABLE "cardToWantsList" ADD CONSTRAINT cardtowantslist_wantslistid_foreign FOREIGN KEY ("wantsListId") REFERENCES "wantsLists"(id);'
  );

  await knex.schema.raw(`
        CREATE VIEW "cardToWantsListWithOracle" AS (
            SELECT "cardToWantsList".*, cards.oracle_id
            FROM "cardToWantsList"
            LEFT JOIN cards
            ON "cardToWantsList".id = cards.id
        );
    `);
};

// eslint-disable-next-line
export const down = () => {};
