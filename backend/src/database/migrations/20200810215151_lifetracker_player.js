export const up = async knex => {
  await knex.schema.createTable('ltPlayers', table => {
    table
      .string('userId')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');

    table.string('img');
    table.string('color');
    table.string('name').notNullable();
    table.timestamp('lastEdit').defaultTo(knex.fn.now());

    table.primary(['userId', 'name']);
  });
};

export const down = async knex => {
  await knex.schema.dropTable('ltPlayers');
};
