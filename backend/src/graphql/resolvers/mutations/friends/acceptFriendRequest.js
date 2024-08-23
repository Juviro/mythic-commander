const acceptFriendRequest = async (_, { userId }, { user, db }) => {
  await db('friends')
    .where({
      fromUserId: userId,
      toUserId: user.id,
    })
    .update({
      accepted: true,
    });

  return true;
};

export default acceptFriendRequest;
