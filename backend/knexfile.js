/* eslint-disable import/no-commonjs */
module.exports = {
  client: 'pg',
  migrations: {
    directory: './src/database/migrations',
  },
  connection: {
    database: process.env.DB_NAME || 'mtg',
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.PGPASS,
  },
  useNullAsDefault: true,
};
