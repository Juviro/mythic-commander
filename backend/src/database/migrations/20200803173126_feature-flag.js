export const up = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.specificType('featureFlags', 'text[]');
  });
  await knex('users')
    .update({ featureFlags: ['LIFETRACKER'] })
    .where({ email: 'hauketw@gmail.com' });
};

export const down = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('featureFlags');
  });
};
