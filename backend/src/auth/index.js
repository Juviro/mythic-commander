import { randomBytes } from 'crypto';
import { OAuth2Client } from 'google-auth-library';

const TOKEN_EXPIRATION = 365 * 24 * 60 * 60 * 1000;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

export async function validateToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();

  const id = payload.sub;
  const { name } = payload;
  const { email } = payload;
  const avatar = payload.picture;

  return { googleId: id, email, name, avatar };
}

export const getSession = (userId) => {
  const sessionId = randomBytes(30).toString('hex');

  const expires = new Date(Date.now() + TOKEN_EXPIRATION);

  return {
    sessionId,
    expires,
    userId,
  };
};
