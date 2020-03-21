const IS_DEV = process.env.NODE_ENV === 'development';

export const SERVER_URL = IS_DEV
  ? 'http://localhost:4000/mtg-api/graphql'
  : 'https://ec2-54-93-181-80.eu-central-1.compute.amazonaws.com/mtg-api/graphql';
