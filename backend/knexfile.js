module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/mtg',
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
      password: 'dqwfhife83hfwkrh38fnwfbcxsi3r2uu9fcewrb321f90d8fy2b3r98dsfye9vhdqww83rnfY',
      host: 'postgres://localhost/mtg',
    },
    migrations: {
      directory: './src/database/migrations',
    },
  },
};
