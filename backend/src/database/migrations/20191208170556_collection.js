export const up = async (knex) => {
  await knex.schema.createTable('collection', (table) => {
    table.string('id');
    table.string('userId');
    table.string('set');
    table.boolean('isFoil');
    table.integer('amount');
    table.timestamp('createdAt').defaultTo(knex.fn.now());

    table.foreign('userId').references('users.id');
    table.primary(['id', 'userId', 'set', 'isFoil']);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('collection');
};
