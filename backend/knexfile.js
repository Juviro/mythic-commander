module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'mtg',
      host: 'localhost',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      user: 'hauke',
      database: 'mtg',
      password: '17ARqkNuJWKgyDHAEVDP',
      host: 'mtg.cr9n9thq5jyt.eu-central-1.rds.amazonaws.com',
    },
    migrations: {
      directory: './src/database/migrations',
    },
  },
  // production: {
  //   client: 'pg',
  //   connection: {
  //     user: 'hauke',
  //     database: 'mtg',
  //     password:
  //       'dqwfhife83hfwkrh38fnwfbcxsi3r2uu9fcewrb321f90d8fy2b3r98dsfye9vhdqww83rnfY',
  //     host: 'localhost',
  //   },
  //   migrations: {
  //     directory: './src/database/migrations',
  //   },
  // },
};
