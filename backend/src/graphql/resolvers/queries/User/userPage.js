const userPage = async (_, { username }, { user: { id: ownId }, db }) => {
  const { id: userId, username: actualUsername } = await db('users')
    .whereRaw('lower(username) = ?', username.toLowerCase())
    .select('id', 'username')
    .first();

  const publicDecks = await db('decks')
    .where({
      userId,
      visibility: 'public',
    })
    .orderBy('status', 'asc')
    .select('id', 'name', 'imgSrc', 'status', 'lastEdit');

  const publicWantsLists = await db('wantsLists')
    .where({
      userId,
      visibility: 'public',
    })
    .select('id', 'name', 'lastEdit');

  const isCollectionPublic = await db('collectionVisibility')
    .where({
      userId,
      visibility: 'public',
    })
    .first();

  const hasFriendRequest =
    ownId &&
    (await db('friends')
      .where({
        fromUserId: ownId,
        toUserId: userId,
      })
      .orWhere({
        fromUserId: userId,
        toUserId: ownId,
      })
      .first());

  const canSendFriendRequest = ownId && ownId !== userId && !hasFriendRequest;

  return {
    username: actualUsername,
    userId,
    decks: publicDecks,
    wantsLists: publicWantsLists,
    isCollectionPublic: Boolean(isCollectionPublic),
    canSendFriendRequest: Boolean(canSendFriendRequest),
  };
};

export default userPage;
