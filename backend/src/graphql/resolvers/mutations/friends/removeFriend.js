const removeFriend = async (_, { userId }, { user, db }) => {
  await db('friends')
    .where({
      fromUserId: user.id,
      toUserId: userId,
    })
    .orWhere({
      fromUserId: userId,
      toUserId: user.id,
    })
    .del();

  return true;
};

export default removeFriend;
