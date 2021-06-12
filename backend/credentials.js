/* eslint-disable import/no-commonjs */

module.exports = {
  cardmarket: {
    appToken: '9IhHfEmkYnyrfUwc',
    appSecret: 'V0eKG9mfO6kPuZcCMeg3JkVc41c47bMw',
  },
  database: {
    local: {
      user: 'root',
      database: 'mtg',
      password: 'Canuma42.PepeGreen',
      host: 'localhost',
    },
    prod: {
      user: 'hauke',
      database: 'mtg',
      password: '17ARqkNuJWKgyDHAEVDP',
      host: 'mtg.cr9n9thq5jyt.eu-central-1.rds.amazonaws.com',
    },
    staging: {
      user: 'hauke',
      database: 'mtg',
      password:
        'dqwfhife83hfwkrh38fnwfbcxsi3r2uu9fcewrb321f90d8fy2b3r98dsfye9vhdqww83rnfY',
      host: 'localhost',
    },
  },
};
