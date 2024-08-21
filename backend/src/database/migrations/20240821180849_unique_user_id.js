import randomId from '../../utils/randomId';

// tables to alter
const TABLES_TO_ALTER = [
  'collection',
  'collectionSnapshot',
  'collectionVisibility',
  'decks',
  'defaultCardVersions',
  'ltPlayers',
  'sessions',
  'wantsLists',
];

export const up = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.string('googleId');
  });

  await knex('users').update('googleId', knex.raw('id'));

  // drop all foreign keys
  for (const table of TABLES_TO_ALTER) {
    await knex.schema.alterTable(table, (t) => {
      t.dropForeign('userId');
    });
  }

  // update all user ids
  const users = await knex('users').select('id');

  for (const user of users) {
    const newUserId = randomId();
    await knex('users').where('id', user.id).update('id', newUserId);

    for (const table of TABLES_TO_ALTER) {
      await knex(table).where('userId', user.id).update('userId', newUserId);
    }
  }

  // re-add foreign keys
  for (const table of TABLES_TO_ALTER) {
    await knex.schema.alterTable(table, (t) => {
      t.foreign('userId').references('users.id').onDelete('CASCADE');
    });
  }
};

export const down = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('googleId');
  });
};
