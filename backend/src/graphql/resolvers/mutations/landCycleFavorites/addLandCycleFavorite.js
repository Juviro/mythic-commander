const addLandCycleFavorite = async (_, { landCycleId }, { user, db }) => {
  await db('landCycleFavorites')
    .insert({
      userId: user.id,
      landCycleId,
    })
    .onConflict(['userId', 'landCycleId'])
    .ignore();

  return true;
};

export default addLandCycleFavorite;
