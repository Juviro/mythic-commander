"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCardsById = exports.getCardsByName = exports.getCards = exports.populateCards = exports.addAdditionalProperties = void 0;

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var sortByName = function sortByName(a, b) {
  return a.name > b.name ? 1 : -1;
};

var sortById = function sortById(a, b) {
  return a.id > b.id ? 1 : -1;
};

var addAdditionalProperties = function addAdditionalProperties(_ref) {
  var type_line = _ref.type_line,
      owned = _ref.owned,
      rest = _objectWithoutProperties(_ref, ["type_line", "owned"]);

  var _type_line$split = type_line.split(' // '),
      _type_line$split2 = _slicedToArray(_type_line$split, 2),
      mainTypes = _type_line$split2[0],
      flipTypes = _type_line$split2[1];

  var _mainTypes$split$map = mainTypes.split(' — ').map(function (part) {
    return part.split(' ');
  }),
      _mainTypes$split$map2 = _slicedToArray(_mainTypes$split$map, 2),
      primaryTypes = _mainTypes$split$map2[0],
      subTypes = _mainTypes$split$map2[1];

  var showAsOwned = Boolean(owned || primaryTypes.includes('Basic'));
  return _objectSpread({
    type_line: type_line,
    primaryTypes: primaryTypes,
    subTypes: subTypes,
    flipTypes: flipTypes && flipTypes.split(' '),
    owned: showAsOwned
  }, rest);
}; // TODO try to deprecate this


exports.addAdditionalProperties = addAdditionalProperties;

var populateCards = function populateCards(cards) {
  var sortedCards, ids, rawCards, populatedCards;
  return regeneratorRuntime.async(function populateCards$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sortedCards = cards.sort(sortById);
          ids = sortedCards.map(function (_ref2) {
            var id = _ref2.id;
            return id;
          });
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _database.default)('cards').whereIn('id', ids).orderBy('id', 'ASC'));

        case 4:
          rawCards = _context.sent;
          populatedCards = rawCards.map(function (card, index) {
            return _objectSpread({}, card, {}, cards[index]);
          }).map(addAdditionalProperties);
          return _context.abrupt("return", populatedCards.sort(sortByName));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.populateCards = populateCards;

var getCards = function getCards(selector, value) {
  var query, orderClause, _ref3, cards, filteredCards;

  return regeneratorRuntime.async(function getCards$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          query = (0, _database.default)('cards').whereIn(selector, value).toString();
          orderClause = " ORDER BY oracle_id, (prices->>'eur')::float";
          _context2.next = 4;
          return regeneratorRuntime.awrap(_database.default.raw(query + orderClause));

        case 4:
          _ref3 = _context2.sent;
          cards = _ref3.rows;
          filteredCards = cards.filter(function (card, index) {
            return !cards[index - 1] || card.oracle_id !== cards[index - 1].oracle_id;
          });
          return _context2.abrupt("return", filteredCards);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getCards = getCards;

var getCardsByName = function getCardsByName(names) {
  return regeneratorRuntime.async(function getCardsByName$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", getCards('name', names));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getCardsByName = getCardsByName;

var getCardsById = function getCardsById(ids) {
  return regeneratorRuntime.async(function getCardsById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", getCards('id', ids));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getCardsById = getCardsById;