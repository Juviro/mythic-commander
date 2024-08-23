const sendFriendRequest = async (_, { userId }, { user, db }) => {
  const friendshipExists = await db('friends')
    .where({
      fromUserId: user.id,
      toUserId: userId,
    })
    .orWhere({
      fromUserId: userId,
      toUserId: user.id,
    })
    .first();

  if (friendshipExists) {
    return false;
  }

  await db('friends')
    .insert({
      fromUserId: user.id,
      toUserId: userId,
    })
    .onConflict(['fromUserId', 'toUserId'])
    .ignore();

  return true;
};

export default sendFriendRequest;
