const getFriends = async (_, __, { user, db }) => {
  const { rows: allFriends } = await db.raw(
    `
        SELECT 
            friends.*,
            "from".username as "fromUserName",
            "to".username as "toUserName",
            "from".avatar as "fromAvatar",
            "to".avatar as "toAvatar"
        FROM friends
        LEFT JOIN 
            users "from" ON "from".id = "fromUserId"
        LEFT JOIN 
            users "to" ON "to".id = "toUserId"
        WHERE
            "fromUserId" = ? 
            OR "toUserId" = ?
    `,
    [user.id, user.id]
  );

  const friends = allFriends
    .map((friendObject) => {
      const isSender = friendObject.fromUserId === user.id;

      return {
        id: isSender ? friendObject.toUserId : friendObject.fromUserId,
        username: isSender
          ? friendObject.toUserName
          : friendObject.fromUserName,
        avatar: isSender ? friendObject.toAvatar : friendObject.fromAvatar,
        canAccept: !friendObject.accepted && !isSender,
        canWithdraw: !friendObject.accepted && isSender,
      };
    })
    .sort((a, b) => {
      if (a.canAccept !== b.canAccept) {
        return a.canAccept ? -1 : 1;
      }
      if (a.canWithdraw !== b.canWithdraw) {
        return a.canWithdraw ? 1 : -1;
      }
      return a.username.localeCompare(b.username);
    });

  return friends;
};

export default getFriends;
