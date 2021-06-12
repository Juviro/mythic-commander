/* eslint-disable import/no-commonjs */

const { database } = require('./credentials');

const defaultSettings = {
  client: 'pg',
  migrations: {
    directory: './src/database/migrations',
  },
  connection: {
    database: 'mtg',
    host: 'localhost',
  },
};

module.exports = {
  development: {
    ...defaultSettings,
    useNullAsDefault: true,
    connection: database.local,
  },

  staging: {
    ...defaultSettings,
    connection: database.staging,
  },
  production: {
    ...defaultSettings,
    connection: database.prod,
  },
};
