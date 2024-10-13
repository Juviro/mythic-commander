import { NextApiRequest, NextApiResponse } from 'next';

import getUser from 'backend/database/getUser';
import db from '../../backend/database/db';

const unnestColorIdentity = (decksList: any[]) => {
  return decksList.map((deck) => {
    return {
      ...deck,
      colorIdentity: deck.colorIdentity && Array.from(new Set(deck.colorIdentity.flat())),
    };
  });
};

const decks = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cookie } = req.headers;
  const user = await getUser(cookie);

  const { rows: ownDecks } = await db.raw(
    `
    SELECT 
      decks.id,
      decks."imgSrc",
      decks.name,
      decks.status,
      commanders.name as "commanderName",
      commanders.color_identity as "colorIdentity"
    FROM 
      decks
    LEFT OUTER JOIN
      (
        SELECT 
          STRING_AGG(name, ' & ') as name,
          jsonb_agg(color_identity) as color_identity,
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
    ORDER BY
      decks.name ASC
    `,
    [user.id]
  );

  const { rows: publicDecks } = await db.raw(
    `
    SELECT 
      decks.id,
      decks."imgSrc",
      decks.name,
      commanders.name as "commanderName",
      commanders.color_identity as "colorIdentity",
      users.username as "ownerName"
    FROM 
      decks
    LEFT OUTER JOIN
      (
        SELECT 
          STRING_AGG(name, ' & ') as name, 
          jsonb_agg(color_identity) as color_identity,
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
    LEFT JOIN 
      users
    ON
      users.id = decks."userId"
    WHERE
      "userId" != ?
    AND
      (decks.status = 'active' OR decks.status = 'archived')
    AND
      decks.visibility = 'public'
    ORDER BY
      decks.name ASC
    `,
    [user.id]
  );

  res.send({
    ownDecks: unnestColorIdentity(ownDecks),
    publicDecks: unnestColorIdentity(publicDecks),
  });
};

export default decks;
