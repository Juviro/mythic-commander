export const up = async (knex) => {
  await knex.schema.createTable('collectionValue', (table) => {
    table
      .string('userId')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table.integer('value').notNullable();
    table.timestamp('date').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('collectionAmount', (table) => {
    table
      .string('userId')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table.integer('amount').notNullable();
    table.integer('amountUnique').notNullable();
    table.timestamp('date').defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable('collection', (table) => {
    table.float('insertValue');
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('collectionValue');
  await knex.schema.dropTable('collectionAmount');
};
