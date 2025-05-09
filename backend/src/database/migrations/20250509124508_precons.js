export const up = async (knex) => {
  await knex.schema.createTable('precons', (table) => {
    table.string('id').notNullable().primary();
    table.string('name').notNullable();
    table.string('commanderName');
    table.string('releaseName');
    table.string('createdAt').notNullable();
    table.string('deckUrl').notNullable();
    table.string('imgSrc');
    table.jsonb('colorIdentity').notNullable();
    table.jsonb('cards').notNullable();
    table.jsonb('commanders').notNullable();
    table.jsonb('commanderAlternatives').notNullable();
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('precons');
};
