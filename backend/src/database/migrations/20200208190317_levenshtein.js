export const up = async knex => {
  await knex.schema.raw(`
        CREATE EXTENSION fuzzystrmatch;
      `);
};

export const down = async knex => {
  await knex.schema.raw(`
        DROP EXTENSION fuzzystrmatch;
      `);
};
