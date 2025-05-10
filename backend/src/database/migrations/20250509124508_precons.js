export const up = async (knex) => {
  await knex.schema.createTable('precons', (table) => {
    table.string('id').notNullable().primary();
    table.string('name').notNullable();
    table.string('commanderName');
    table.string('createdAt').notNullable();
    table.string('deckUrl').notNullable();
    table.string('imgSrc');
    table.string('set');
    table.jsonb('colorIdentity').notNullable();
    table.jsonb('cards').notNullable();
    table.jsonb('commanders').notNullable();
    table.jsonb('alternativeCommanders').notNullable();
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('precons');
};
