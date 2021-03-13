export const IS_DEV = process.env.NODE_ENV === 'development';

export const SERVER_URL = IS_DEV
  ? // ? 'http://192.168.178.179:4000/mtg-api/graphql'
    'http://localhost:4000/mtg-api/graphql'
  : '/mtg-api/graphql';
