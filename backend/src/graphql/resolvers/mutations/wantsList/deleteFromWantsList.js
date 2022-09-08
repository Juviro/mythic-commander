import { canEditWantsList } from '../../../../auth/authenticateUser';
import { updateLastEdit } from './helper';

export default async (_, { oracleIds, wantsListId }, { user, db }) => {
  await canEditWantsList(user.id, wantsListId);

  await db.raw(
    `
      DELETE FROM "cardToWantsList"
      USING "cardToWantsList" AS wants
      LEFT JOIN "cardToWantsListWithOracle" AS wantsOracle ON
        wants.id = wantsOracle.id
      WHERE
        "cardToWantsList".id = wants.id AND
        wantsOracle.oracle_id = ANY(?)
        AND "cardToWantsList"."wantsListId" = ?;
    `,
    [oracleIds, wantsListId]
  );

  await updateLastEdit(wantsListId, db);

  return db('wantsLists').where({ id: wantsListId }).first();
};
