"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canAccessDeck = void 0;

var _database = _interopRequireDefault(require("../database"));

var _apolloServerKoa = require("apollo-server-koa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canAccessDeck = function canAccessDeck(userId, deckId) {
  var isAuthenticated;
  return regeneratorRuntime.async(function canAccessDeck$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _database.default)('decks').where({
            userId: userId,
            id: deckId
          }));

        case 2:
          isAuthenticated = _context.sent.length;

          if (isAuthenticated) {
            _context.next = 5;
            break;
          }

          throw new _apolloServerKoa.ValidationError('Not authenticated');

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.canAccessDeck = canAccessDeck;