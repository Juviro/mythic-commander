import { NextApiRequest, NextApiResponse } from 'next';
import getUser from '../../backend/websocket/getUser';
import db from '../../backend/database/db';

const decks = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cookie } = req.headers;
  const user = await getUser(cookie);

  const { rows: userDecks } = await db.raw(
    `
    SELECT 
      decks.id,
      decks."imgSrc",
      decks.name,
      commanders.name as "publicName"
    FROM 
      decks
    LEFT OUTER JOIN
      (
        SELECT 
          STRING_AGG(name, ' & ') as name, 
          "deckId" 
        FROM 
          "cardToDeck" 
        LEFT JOIN 
          cards 
        ON 
          cards.id = "cardToDeck".id 
        WHERE 
          "cardToDeck"."isCommander" = true
        GROUP BY
          "deckId"		
      ) commanders
    ON 
      commanders."deckId" = decks.id
    WHERE
      "userId" = ?
    AND
      decks.status = 'active'
    ORDER BY
      decks.name ASC
    `,
    [user.id]
  );

  res.send(userDecks);
};

export default decks;
