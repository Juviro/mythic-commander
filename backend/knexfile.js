// Update with your config settings.

module.exports = {
  // ################ Obsolete
  // development: {
  //   client: 'mysql',
  //   connection: {
  //     user: 'sql7315069',
  //     database: 'sql7315069',
  //     password: '5i7Sevssj1',
  //     host: 'sql7.freemysqlhosting.net',
  //   },
  //   migrations: {
  //     directory: './migrations',
  //   },
  // },
  // ################ Current
  // development: {
  //   client: 'mysql',
  //   connection: {
  //     user: 'xyC4GlLCtS',
  //     database: 'xyC4GlLCtS',
  //     password: 'u3UqHKq2Z4',
  //     host: 'remotemysql.com',
  //     connectionTimeout: 30000,
  //   },
  //   migrations: {
  //     directory: './migrations',
  //   },
  // },
  // ################ Local
  // development: {
  //   client: 'mysql',
  //   connection: {
  //     user: 'root',
  //     database: 'mtg',
  //     password: 'fnqi3jmv73ncowe9',
  //     host: 'localhost',
  //     connectionTimeout: 30000,
  //   },
  //   migrations: {
  //     directory: './migrations',
  //   },
  // },
  // ################ Postgresql Local
  development: {
    client: 'pg',
    connection: 'postgres://localhost/mtg',
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      user: 'xyC4GlLCtS',
      database: 'xyC4GlLCtS',
      password: 'u3UqHKq2Z4',
      host: 'remotemysql.com',
    },
    migrations: {
      directory: './src/database/migrations',
    },
  },
};
