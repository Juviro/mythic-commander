"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateCards = exports.getCardsByName = exports.getCardsById = void 0;

var _scryfallSdk = require("scryfall-sdk");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var sortByName = function sortByName(a, b) {
  return a.name > b.name ? 1 : -1;
};

var getCollection = function getCollection(collection, identifier) {
  var start, cardCollection, cards;
  return regeneratorRuntime.async(function getCollection$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          start = Date.now();

          if (collection.length) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", []);

        case 3:
          cardCollection = collection.map(function (id) {
            return identifier(id);
          });
          _context.next = 6;
          return regeneratorRuntime.awrap(_scryfallSdk.Cards.collection.apply(_scryfallSdk.Cards, _toConsumableArray(cardCollection)).waitForAll());

        case 6:
          cards = _context.sent;
          console.info('########## fetchig cards took', (Date.now() - start) / 1000, 's');
          return _context.abrupt("return", cards);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getCardsById = function getCardsById(ids) {
  return regeneratorRuntime.async(function getCardsById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", getCollection(ids, _scryfallSdk.CardIdentifier.byId));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getCardsById = getCardsById;

var getCardsByName = function getCardsByName(names) {
  return regeneratorRuntime.async(function getCardsByName$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", getCollection(names, _scryfallSdk.CardIdentifier.byName));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getCardsByName = getCardsByName;

var populateCards = function populateCards(cards, sort) {
  var ids, rawCards, populatedCards;
  return regeneratorRuntime.async(function populateCards$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          ids = cards.map(function (_ref) {
            var id = _ref.id;
            return id;
          });
          _context4.next = 3;
          return regeneratorRuntime.awrap(getCardsById(ids));

        case 3:
          rawCards = _context4.sent;
          populatedCards = rawCards.map(function (card, index) {
            return _objectSpread({}, card, {}, cards[index]);
          });
          return _context4.abrupt("return", populatedCards.sort(sort || sortByName));

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.populateCards = populateCards;