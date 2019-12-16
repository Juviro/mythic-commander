// Update with your config settings.

module.exports = {
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
  development: {
    client: 'mysql',
    connection: {
      user: 'xyC4GlLCtS',
      database: 'xyC4GlLCtS',
      password: 'u3UqHKq2Z4',
      host: 'remotemysql.com',
      connectionTimeout: 30000,
    },
    migrations: {
      directory: './migrations',
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
      directory: './migrations',
    },
  },
}
