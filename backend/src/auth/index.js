import { randomBytes } from 'crypto';
import { OAuth2Client } from 'google-auth-library';

const TOKEN_EXPIRATION = 365 * 24 * 60 * 60 * 1000;
// TODO: move to env
const CLIENT_ID =
  '985753697547-184gkcavnrc8f4flq1tdjra30amuchgo.apps.googleusercontent.com';

const client = new OAuth2Client(CLIENT_ID);

export async function validateToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();

  const id = payload.sub;
  const name = payload.name;
  const email = payload.email;
  const avatar = payload.picture;

  return { id, email, name, avatar };
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
