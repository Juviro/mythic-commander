const removeLandCycleFavorite = async (_, { landCycleId }, { user, db }) => {
  await db('landCycleFavorites')
    .where({
      userId: user.id,
      landCycleId,
    })
    .del();

  return true;
};

export default removeLandCycleFavorite;