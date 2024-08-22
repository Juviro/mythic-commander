import database from '../../../../database';

const getFriendIds = async (userId) => {
  const { rows: friends } = await database.raw(
    `
        WITH ids as (
            SELECT 
                CASE
                    WHEN "fromUserId" = ? THEN "toUserId"
                    ELSE "fromUserId"
                END as "userId"
            FROM 
                friends
            WHERE 
                accepted = true
            AND
                ("fromUserId" = ? OR "toUserId" = ?)
        ) 
        SELECT ids.*, users.username
        FROM ids
        LEFT JOIN users
            ON users.id = ids."userId";
        `,
    [userId, userId, userId]
  );

  return friends;
};

export default getFriendIds;
