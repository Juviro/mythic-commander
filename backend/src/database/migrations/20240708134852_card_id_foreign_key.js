export const up = async (knex) => {
  await knex.schema.alterTable('cardToDeck', (table) => {
    table.foreign('id').references('cards.id').onDelete('RESTRICT');
  });
  await knex.schema.alterTable('collection', (table) => {
    table.foreign('id').references('cards.id').onDelete('RESTRICT');
  });
  await knex.schema.alterTable('defaultCardVersions', (table) => {
    table.foreign('id').references('cards.id').onDelete('CASCADE');
  });
};

export const down = async (knex) => {
  await knex.schema.alterTable('cardToDeck', (table) => {
    table.dropForeign('id');
  });
  await knex.schema.alterTable('collection', (table) => {
    table.dropForeign('id');
  });
  await knex.schema.alterTable('defaultCardVersions', (table) => {
    table.dropForeign('id');
  });
};
