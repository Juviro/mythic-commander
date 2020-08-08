export const up = async knex => {
  await knex.raw(`
        ALTER TABLE collection
        ALTER COLUMN amount
        SET DEFAULT 0
    `);
};

export const down = async knex => {
  await knex.raw(`
        ALTER TABLE collection
        ALTER COLUMN amount
        DROP DEFAULT
    `);
};
