import db from '../../../database';
import { throwAuthError } from '../../../auth/authenticateUser';

const tokenFinder = async userId => {
  if (!userId) throwAuthError();

  const { rows: data } = await db.raw(
    `
    SELECT 
        cards.all_parts
    FROM 
        decks
    LEFT JOIN
        "cardToDeck"
    ON 
        decks.id = "cardToDeck"."deckId"
    LEFT JOIN
        "cards"
    ON 
        cards.id = "cardToDeck".id
    WHERE 
        "userId" = ? 
    AND 
        status = 'active'
    AND
        all_parts IS NOT NULL;
  `,
    [userId]
  );

  const tokenIds = data
    .map(({ all_parts }) => all_parts)
    .flat()
    .filter(({ component }) => component === 'token')
    .map(({ id }) => `'${id}'`);

  if (!tokenIds.length) return [];

  const { rows: tokens } = await db.raw(
    `
        WITH tokens as (
            SELECT 
                DISTINCT ON (oracle_id)
                *
            FROM cards 
            WHERE id IN (${tokenIds.join(',')})
            ORDER BY oracle_id
        )
        SELECT * 
        FROM tokens 
        ORDER BY color_identity
    `
  );

  return tokens;
};

export default tokenFinder;
