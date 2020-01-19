"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _lodash = require("lodash");

var _cardApi = require("../../../cardApi/");

var _internal = require("../../../cardApi/internal");

var _authenticateUser = require("../../../auth/authenticateUser");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DEFAULT_ZONE = 'MAINBOARD';
var ON_DUPLICATE = " ON CONFLICT (\"deckId\", \"oracle_id\") DO UPDATE SET \"cardId\"=EXCLUDED.\"cardId\"";

var getPopulatedCards = function getPopulatedCards(db, deckId) {
  var _ref, populatedCards;

  return regeneratorRuntime.async(function getPopulatedCards$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.raw("\n  SELECT \"cardToDeck\".zone, cards.*, \"cardsBySet\".all_sets, CASE WHEN owned.oracle_id IS NULL THEN NULL ELSE 1 END AS owned\n    FROM \"cardToDeck\" \n  LEFT JOIN cards \n    ON \"cardToDeck\".\"cardId\" = cards.id \n  LEFT JOIN \"cardsBySet\" \n    ON \"cardToDeck\".\"oracle_id\" = \"cardsBySet\".oracle_id \n  LEFT JOIN (SELECT DISTINCT oracle_id FROM collection LEFT JOIN cards ON collection.id = cards.id) owned\n    ON cards.oracle_id = owned.oracle_id\n  WHERE \"deckId\" = ?", deckId));

        case 2:
          _ref = _context.sent;
          populatedCards = _ref.rows;
          return _context.abrupt("return", populatedCards.map(_internal.addAdditionalProperties));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var updateLastEdit = function updateLastEdit(deckId, db) {
  return db('decks').where({
    id: deckId
  }).update({
    lastEdit: new Date()
  });
};

var _default = {
  Query: {
    decks: function decks(_, _1, _ref2) {
      var user, db, decks;
      return regeneratorRuntime.async(function decks$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              user = _ref2.user, db = _ref2.db;
              _context2.next = 3;
              return regeneratorRuntime.awrap(db('decks').where({
                userId: user.id
              }));

            case 3:
              decks = _context2.sent;
              return _context2.abrupt("return", decks);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    deck: function deck(_, _ref3, _ref4) {
      var id, user, db, _ref5, _ref6, deck, populatedCards;

      return regeneratorRuntime.async(function deck$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = _ref3.id;
              user = _ref4.user, db = _ref4.db;
              _context3.next = 4;
              return regeneratorRuntime.awrap(db('decks').where({
                userId: user.id,
                id: id
              }));

            case 4:
              _ref5 = _context3.sent;
              _ref6 = _slicedToArray(_ref5, 1);
              deck = _ref6[0];
              _context3.next = 9;
              return regeneratorRuntime.awrap(getPopulatedCards(db, deck.id));

            case 9:
              populatedCards = _context3.sent;
              return _context3.abrupt("return", _objectSpread({}, deck, {
                cards: populatedCards
              }));

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  },
  Mutation: {
    createDeck: function createDeck(_, _1, _ref7) {
      var user, db, _ref8, _ref9, deckId, _ref10, _ref11, deck;

      return regeneratorRuntime.async(function createDeck$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              user = _ref7.user, db = _ref7.db;
              _context4.next = 3;
              return regeneratorRuntime.awrap(db('decks').insert({
                userId: user.id
              }).returning('id'));

            case 3:
              _ref8 = _context4.sent;
              _ref9 = _slicedToArray(_ref8, 1);
              deckId = _ref9[0];
              _context4.next = 8;
              return regeneratorRuntime.awrap(db('decks').where({
                id: deckId
              }));

            case 8:
              _ref10 = _context4.sent;
              _ref11 = _slicedToArray(_ref10, 1);
              deck = _ref11[0];
              return _context4.abrupt("return", deck);

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    editDeck: function editDeck(_, _ref12, _ref13) {
      var _ref12$newProperties, imgSrc, name, deckId, user, db, _ref14, _ref15, updatedDeck, populatedCards;

      return regeneratorRuntime.async(function editDeck$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ref12$newProperties = _ref12.newProperties, imgSrc = _ref12$newProperties.imgSrc, name = _ref12$newProperties.name, deckId = _ref12.deckId;
              user = _ref13.user, db = _ref13.db;
              _context5.next = 4;
              return regeneratorRuntime.awrap(db('decks').where({
                userId: user.id,
                id: deckId
              }).update({
                imgSrc: imgSrc,
                name: name,
                lastEdit: new Date()
              }));

            case 4:
              _context5.next = 6;
              return regeneratorRuntime.awrap(db('decks').where({
                id: deckId
              }));

            case 6:
              _ref14 = _context5.sent;
              _ref15 = _slicedToArray(_ref14, 1);
              updatedDeck = _ref15[0];
              _context5.next = 11;
              return regeneratorRuntime.awrap(getPopulatedCards(db, deckId));

            case 11:
              populatedCards = _context5.sent;
              return _context5.abrupt("return", _objectSpread({}, updatedDeck, {
                cards: populatedCards
              }));

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    addCardsToDeck: function addCardsToDeck(_, _ref16, _ref17) {
      var _ref16$input, cardNames, deckId, user, db, isAuthenticated, cards, cardsToInsert, query, populatedCards, _ref19, _ref20, deck;

      return regeneratorRuntime.async(function addCardsToDeck$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ref16$input = _ref16.input, cardNames = _ref16$input.cards, deckId = _ref16$input.deckId;
              user = _ref17.user, db = _ref17.db;
              _context6.next = 4;
              return regeneratorRuntime.awrap(db('decks').where({
                userId: user.id,
                id: deckId
              }));

            case 4:
              isAuthenticated = _context6.sent.length;

              if (isAuthenticated) {
                _context6.next = 7;
                break;
              }

              throw new _apolloServerKoa.ValidationError('Not authenticated');

            case 7:
              _context6.next = 9;
              return regeneratorRuntime.awrap((0, _cardApi.getCardsByName)(cardNames));

            case 9:
              cards = _context6.sent;
              cardsToInsert = cards.map(function (_ref18) {
                var cardId = _ref18.id,
                    oracle_id = _ref18.oracle_id;
                return {
                  deckId: deckId,
                  cardId: cardId,
                  oracle_id: oracle_id,
                  zone: DEFAULT_ZONE
                };
              });
              query = db('cardToDeck').insert(cardsToInsert).toString();
              _context6.next = 14;
              return regeneratorRuntime.awrap(db.raw(query + ON_DUPLICATE));

            case 14:
              _context6.next = 16;
              return regeneratorRuntime.awrap(updateLastEdit(deckId, db));

            case 16:
              _context6.next = 18;
              return regeneratorRuntime.awrap(getPopulatedCards(db, deckId));

            case 18:
              populatedCards = _context6.sent;
              _context6.next = 21;
              return regeneratorRuntime.awrap(db('decks').where({
                id: deckId
              }));

            case 21:
              _ref19 = _context6.sent;
              _ref20 = _slicedToArray(_ref19, 1);
              deck = _ref20[0];
              return _context6.abrupt("return", _objectSpread({}, deck, {
                cards: populatedCards
              }));

            case 25:
            case "end":
              return _context6.stop();
          }
        }
      });
    },
    editDeckCard: function editDeckCard(_, _ref21, _ref22) {
      var cardOracleId, deckId, newProps, user, db, updatedProps, _ref23, _ref24, id, owned, _ref25, _ref26, deckCard, _ref27, _ref28, set, _ref29, _ref30, deck, populatedCards;

      return regeneratorRuntime.async(function editDeckCard$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              cardOracleId = _ref21.cardOracleId, deckId = _ref21.deckId, newProps = _ref21.newProps;
              user = _ref22.user, db = _ref22.db;
              _context7.next = 4;
              return regeneratorRuntime.awrap((0, _authenticateUser.canAccessDeck)(user.id, deckId));

            case 4:
              updatedProps = (0, _lodash.pick)(newProps, ['zone', 'amount']);

              if (!newProps.set) {
                _context7.next = 12;
                break;
              }

              _context7.next = 8;
              return regeneratorRuntime.awrap(db('cards').where({
                oracle_id: cardOracleId,
                set: newProps.set
              }).select('id'));

            case 8:
              _ref23 = _context7.sent;
              _ref24 = _slicedToArray(_ref23, 1);
              id = _ref24[0].id;
              updatedProps.cardId = id;

            case 12:
              if (!Object.prototype.hasOwnProperty.call(newProps, 'owned')) {
                _context7.next = 31;
                break;
              }

              owned = newProps.owned;
              _context7.next = 16;
              return regeneratorRuntime.awrap(db('cardToDeck').where({
                deckId: deckId,
                oracle_id: cardOracleId
              }));

            case 16:
              _ref25 = _context7.sent;
              _ref26 = _slicedToArray(_ref25, 1);
              deckCard = _ref26[0];

              if (owned) {
                _context7.next = 24;
                break;
              }

              _context7.next = 22;
              return regeneratorRuntime.awrap(db.raw("\n          DELETE FROM collection \n          WHERE id IN(\n            SELECT id FROM cards WHERE oracle_id = (\n              SELECT oracle_id FROM cards \n                WHERE id=?\n              )\n            )\n          ", deckCard.cardId));

            case 22:
              _context7.next = 31;
              break;

            case 24:
              _context7.next = 26;
              return regeneratorRuntime.awrap(db('cards').where({
                id: deckCard.cardId
              }).select('set'));

            case 26:
              _ref27 = _context7.sent;
              _ref28 = _slicedToArray(_ref27, 1);
              set = _ref28[0].set;
              _context7.next = 31;
              return regeneratorRuntime.awrap(db('collection').insert({
                id: deckCard.cardId,
                isFoil: false,
                set: set,
                userId: user.id,
                amount: 1
              }));

            case 31:
              if (!Object.keys(updatedProps).length) {
                _context7.next = 34;
                break;
              }

              _context7.next = 34;
              return regeneratorRuntime.awrap(db('cardToDeck').where({
                oracle_id: cardOracleId,
                deckId: deckId
              }).update(updatedProps));

            case 34:
              _context7.next = 36;
              return regeneratorRuntime.awrap(updateLastEdit(deckId, db));

            case 36:
              _context7.next = 38;
              return regeneratorRuntime.awrap(db('decks').where({
                userId: user.id,
                id: deckId
              }));

            case 38:
              _ref29 = _context7.sent;
              _ref30 = _slicedToArray(_ref29, 1);
              deck = _ref30[0];
              _context7.next = 43;
              return regeneratorRuntime.awrap(getPopulatedCards(db, deck.id));

            case 43:
              populatedCards = _context7.sent;
              return _context7.abrupt("return", _objectSpread({}, deck, {
                cards: populatedCards
              }));

            case 45:
            case "end":
              return _context7.stop();
          }
        }
      });
    },
    deleteFromDeck: function deleteFromDeck(_, _ref31, _ref32) {
      var cardId, deckId, user, db, _ref33, _ref34, deck, populatedCards;

      return regeneratorRuntime.async(function deleteFromDeck$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              cardId = _ref31.cardId, deckId = _ref31.deckId;
              user = _ref32.user, db = _ref32.db;
              _context8.next = 4;
              return regeneratorRuntime.awrap((0, _authenticateUser.canAccessDeck)(user.id, deckId));

            case 4:
              _context8.next = 6;
              return regeneratorRuntime.awrap(db('cardToDeck').where({
                cardId: cardId,
                deckId: deckId
              }).del());

            case 6:
              _context8.next = 8;
              return regeneratorRuntime.awrap(updateLastEdit(deckId, db));

            case 8:
              _context8.next = 10;
              return regeneratorRuntime.awrap(db('decks').where({
                userId: user.id,
                id: deckId
              }));

            case 10:
              _ref33 = _context8.sent;
              _ref34 = _slicedToArray(_ref33, 1);
              deck = _ref34[0];
              _context8.next = 15;
              return regeneratorRuntime.awrap(getPopulatedCards(db, deck.id));

            case 15:
              populatedCards = _context8.sent;
              return _context8.abrupt("return", _objectSpread({}, deck, {
                cards: populatedCards
              }));

            case 17:
            case "end":
              return _context8.stop();
          }
        }
      });
    },
    deleteDeck: function deleteDeck(_, _ref35, _ref36) {
      var deckId, user, db;
      return regeneratorRuntime.async(function deleteDeck$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              deckId = _ref35.deckId;
              user = _ref36.user, db = _ref36.db;
              _context9.next = 4;
              return regeneratorRuntime.awrap((0, _authenticateUser.canAccessDeck)(user.id, deckId));

            case 4:
              _context9.next = 6;
              return regeneratorRuntime.awrap(db('decks').where({
                id: deckId
              }).del());

            case 6:
              return _context9.abrupt("return", true);

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      });
    },
    duplicateDeck: function duplicateDeck(_, _ref37, _ref38) {
      var deckId, user, db, _ref39, _ref39$rows, newDeckId;

      return regeneratorRuntime.async(function duplicateDeck$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              deckId = _ref37.deckId;
              user = _ref38.user, db = _ref38.db;
              _context10.next = 4;
              return regeneratorRuntime.awrap((0, _authenticateUser.canAccessDeck)(user.id, deckId));

            case 4:
              _context10.next = 6;
              return regeneratorRuntime.awrap(db.raw("\n        INSERT INTO decks \n          (\"userId\", name, \"imgSrc\", \"lastEdit\", \"createdAt\") \n        SELECT \n          \"userId\", CONCAT(name, ' - Copy'), \"imgSrc\", NOW() as \"lastEdit\", NOW() as \"createdAt\" \n        FROM decks WHERE id=? RETURNING id\n        ", deckId));

            case 6:
              _ref39 = _context10.sent;
              _ref39$rows = _slicedToArray(_ref39.rows, 1);
              newDeckId = _ref39$rows[0].id;
              _context10.next = 11;
              return regeneratorRuntime.awrap(db.raw("\n        INSERT INTO \"cardToDeck\" \n          (\"deckId\", \"cardId\", zone, amount, oracle_id) \n        SELECT \n          ? as \"deckId\", \"cardId\", zone, amount, oracle_id\n        FROM \"cardToDeck\" WHERE \"deckId\"=?\n        ", [newDeckId, deckId]));

            case 11:
              return _context10.abrupt("return", newDeckId);

            case 12:
            case "end":
              return _context10.stop();
          }
        }
      });
    }
  }
};
exports.default = _default;