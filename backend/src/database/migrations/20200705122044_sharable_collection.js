export const up = async knex => {
  await knex.schema.createTable('collectionVisibility', table => {
    table
      .string('userId')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .unique();
    table.string('visibility');
  });
};

export const down = async knex => {
  await knex.schema.dropTable('collectionVisibility');
};
