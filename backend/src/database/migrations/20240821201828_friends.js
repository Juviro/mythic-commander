export const up = async (knex) => {
  await knex.schema.createTable('friends', (table) => {
    table.string('fromUserId').references('users.id').onDelete('CASCADE');
    table.string('toUserId').references('users.id').onDelete('CASCADE');
    table.boolean('accepted').defaultTo(false);
    table.primary(['fromUserId', 'toUserId']);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('friends');
};
