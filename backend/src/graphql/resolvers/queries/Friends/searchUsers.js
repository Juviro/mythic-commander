const searchUsers = async (_, { search }, { user, db }) => {
  if (search?.length < 3) {
    throw new Error('Search must be at least 3 characters long');
  }

  const currentFriends = await db('friends')
    .where({
      fromUserId: user.id,
    })
    .orWhere({
      toUserId: user.id,
    })
    .select('fromUserId', 'toUserId');

  const currentFriendsIds = currentFriends.map((friend) => {
    if (friend.fromUserId === user.id) {
      return friend.toUserId;
    }
    return friend.fromUserId;
  });

  const users = await db('users')
    .whereNotIn('id', currentFriendsIds.concat(user.id))
    .where((q) =>
      q
        .orWhere('name', 'ilike', `%${search}%`)
        .orWhere('username', 'ilike', `%${search}%`)
    )
    .select('id', 'username');

  const usersWithUsername = users.filter((u) => u.username);

  return usersWithUsername;
};

export default searchUsers;
