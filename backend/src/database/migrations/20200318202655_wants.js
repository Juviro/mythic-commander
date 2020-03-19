export const up = async knex => {
  await knex.schema.createTable('wantsLists', table => {
    table.increments();
    table
      .string('userId')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table
      .string('name')
      .notNullable()
      .defaultTo('New Wants List');
    table.timestamp('lastEdit').defaultTo(knex.fn.now());
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
  await knex.schema.createTable('cardToWantsList', table => {
    table
      .integer('wantsListId')
      .unsigned()
      .notNullable()
      .references('wantsLists.id')
      .onDelete('CASCADE');
    table
      .string('id')
      .notNullable()
      .references('cards.id');
    table
      .integer('amount')
      .defaultsTo(1)
      .notNullable();
    table.primary(['wantsListId', 'id']);
  });
};

export const down = async knex => {
  await knex.schema.dropTable('cardToWantsList');
  await knex.schema.dropTable('wantsLists');
};
