const sendFriendRequest = async (_, { userId }, { user, db }) => {
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
