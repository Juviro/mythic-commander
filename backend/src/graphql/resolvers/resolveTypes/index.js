export default {
  MoveCardListType: {
    __resolveType(obj) {
      const isWantsList = Object.prototype.hasOwnProperty.call(obj, 'deckId');
      if (isWantsList) {
        return 'WantsList';
      }
      return 'Deck';
    },
  },
};
