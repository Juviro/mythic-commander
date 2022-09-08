export const updateLastEdit = (wantsId, db) =>
  db('wantsLists').where({ id: wantsId }).update({
    lastEdit: new Date(),
  });
