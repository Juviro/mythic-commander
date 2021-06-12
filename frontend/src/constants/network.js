export const IS_DEV = process.env.NODE_ENV === 'development';

export const SERVER_URL = IS_DEV
  ? 'http://juviro.ddns.net:4000/mtg-api/graphql'
  : // 'http://localhost:4000/mtg-api/graphql'
    '/mtg-api/graphql';
