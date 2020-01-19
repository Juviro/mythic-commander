"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cardApi = require("../../../cardApi/");

var ON_DUPLICATE = ' ON CONFLICT (id, "isFoil", set, "userId") DO UPDATE SET amount = collection.amount + 1, "createdAt" = NOW()';

var addToCollection = function addToCollection(cards, userId, db) {
  var withoutDuplicates, withUserId;
  return regeneratorRuntime.async(function addToCollection$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          withoutDuplicates = cards.filter(function (_ref, index) {
            var id = _ref.id;
            return index === cards.findIndex(function (card) {
              return card.id === id;
            });
          });
          withUserId = withoutDuplicates.map(function (_ref2) {
            var id = _ref2.id,
                set = _ref2.set;
            return {
              id: id,
              isFoil: false,
              set: set,
              userId: userId,
              amount: 1
            };
          });

          if (withUserId) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", []);

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(db.raw(db('collection').insert(withUserId).toString() + ON_DUPLICATE));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getCollection = function getCollection(userId, db) {
  var collection, cards;
  return regeneratorRuntime.async(function getCollection$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(db('collection').where({
            userId: userId
          }));

        case 2:
          collection = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap((0, _cardApi.populateCards)(collection));

        case 5:
          cards = _context2.sent;
          return _context2.abrupt("return", {
            id: userId,
            cards: cards
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var _default = {
  Query: {
    collection: function collection(_, _1, _ref3) {
      var user, db;
      return regeneratorRuntime.async(function collection$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              user = _ref3.user, db = _ref3.db;
              return _context3.abrupt("return", getCollection(user.id, db));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  },
  Mutation: {
    addToCollectionById: function addToCollectionById(_, _ref4, _ref5) {
      var cardIds, user, db, cards;
      return regeneratorRuntime.async(function addToCollectionById$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              cardIds = _ref4.cards;
              user = _ref5.user, db = _ref5.db;
              _context4.next = 4;
              return regeneratorRuntime.awrap((0, _cardApi.getCardsById)(cardIds.map(function (_ref6) {
                var id = _ref6.id;
                return id;
              })));

            case 4:
              cards = _context4.sent;
              _context4.next = 7;
              return regeneratorRuntime.awrap(addToCollection(cards, user.id, db));

            case 7:
              return _context4.abrupt("return", getCollection(user.id, db));

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    addToCollectionByName: function addToCollectionByName(_, _ref7, _ref8) {
      var cardNames, user, db, cards;
      return regeneratorRuntime.async(function addToCollectionByName$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              cardNames = _ref7.cards;
              user = _ref8.user, db = _ref8.db;
              _context5.next = 4;
              return regeneratorRuntime.awrap((0, _cardApi.getCardsByName)(cardNames.map(function (_ref9) {
                var name = _ref9.name;
                return name;
              })));

            case 4:
              cards = _context5.sent;
              _context5.next = 7;
              return regeneratorRuntime.awrap(addToCollection(cards, user.id, db));

            case 7:
              return _context5.abrupt("return", getCollection(user.id, db));

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    deleteFromCollection: function deleteFromCollection(_, _ref10, _ref11) {
      var cardIds, user, db;
      return regeneratorRuntime.async(function deleteFromCollection$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              cardIds = _ref10.cardIds;
              user = _ref11.user, db = _ref11.db;
              _context6.next = 4;
              return regeneratorRuntime.awrap(db('collection').whereIn('id', cardIds).andWhere({
                userId: user.id
              }).del());

            case 4:
              return _context6.abrupt("return", getCollection(user.id, db));

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }
};
exports.default = _default;