/* eslint-disable import/no-commonjs */

module.exports = {
  cardmarket: {
    appToken: '9IhHfEmkYnyrfUwc',
    appSecret: 'V0eKG9mfO6kPuZcCMeg3JkVc41c47bMw',
  },
  database: {
    prod: {
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.PGPASS,
      host: process.env.DB_HOST,
    },
  },
};
