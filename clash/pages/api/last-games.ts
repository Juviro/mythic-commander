import db from 'backend/database/db';
import { GameState } from 'backend/database/gamestate.types';
import getUser from 'backend/database/getUser';
import { Lobby } from 'backend/lobby/GameLobby.types';
import { NextApiRequest, NextApiResponse } from 'next';

const PAGE_SIZE = 10;

export interface ClashGame {
  id: string;
  created: string;
  lastUpdate: string;
  lobby: Lobby;
  state: Pick<GameState, 'turn' | 'players'>;
}

const getLastGames = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cookie } = req.headers;
  const page = parseInt(req.query.page as string, 10) || 0;
  const user = await getUser(cookie);

  const query = db.raw(
    `
      SELECT * 
      FROM "gameStates" 
      WHERE 
        jsonb_path_exists(
          lobby, '$.** \\? (@.type() == "string" && @ like_regex "${user.id}")'
        )
      ORDER BY "lastUpdate" DESC 
    `
  );
  const { rows: games }: { rows: ClashGame[] } = await query;

  const slicedGames = games.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const lastGames: ClashGame[] = slicedGames.map(({ state, ...rest }) => ({
    ...rest,
    state: {
      turn: state.turn,
      players: state.players,
    },
  }));

  const hasNextPage = games.length > (page + 1) * PAGE_SIZE;
  const nextCursor = hasNextPage ? page + 1 : null;

  res.send({ lastGames, nextCursor });
};

export default getLastGames;
