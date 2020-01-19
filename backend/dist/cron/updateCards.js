"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _scryfallSdk = require("scryfall-sdk");

var _cardFields = require("../database/cardFields");

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var updateClause = _cardFields.ALL_CARD_FIELDS.map(function (_ref) {
  var key = _ref.key;
  return "".concat(key, " = EXCLUDED.").concat(key);
}).join(', ');

var ON_DUPLICATE = " ON CONFLICT (id) DO UPDATE SET ".concat(updateClause, ", \"lastUpdate\" = NOW()");

var getCards = function getCards(page) {
  return regeneratorRuntime.async(function getCards$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve) {
            var cards = [];

            var emitter = _scryfallSdk.Cards.all(page).cancelAfterPage();

            emitter.on('data', function (card) {
              cards.push(card);
            }).on('end', function () {
              resolve({
                cards: cards,
                hasNext: false
              });
            }).on('cancel', function () {
              resolve({
                cards: cards,
                hasNext: true
              });
            });
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var addCardsFromPage = function addCardsFromPage(page) {
  var _ref2, cards, hasNext, cardsToInsert;

  return regeneratorRuntime.async(function addCardsFromPage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getCards(page));

        case 2:
          _ref2 = _context2.sent;
          cards = _ref2.cards;
          hasNext = _ref2.hasNext;
          cardsToInsert = cards.filter(function (_ref3) {
            var lang = _ref3.lang;
            return lang === 'en';
          }).map(function (card) {
            return _cardFields.ALL_CARD_FIELDS.reduce(function (acc, _ref4) {
              var key = _ref4.key,
                  type = _ref4.type;
              var value = type === 'jsonb' ? JSON.stringify(card[key]) : card[key];
              acc[key] = value;
              return acc;
            }, {});
          });

          if (!cardsToInsert.length) {
            _context2.next = 9;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(_database.default.raw((0, _database.default)('cards').insert(cardsToInsert).toString().replace(/\?/g, '\\?') + ON_DUPLICATE));

        case 9:
          return _context2.abrupt("return", hasNext);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var updateCards = function updateCards() {
  var start, hasNext, eventOptions, _ref5, _ref6, currentPage;

  return regeneratorRuntime.async(function updateCards$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          start = Date.now();
          console.info('Starting to update cards at', new Date().toLocaleString('de', {
            timeStyle: 'short'
          }));
          hasNext = true;
          eventOptions = {
            key: 'currentScryfallPage'
          };

        case 4:
          if (!hasNext) {
            _context3.next = 20;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap((0, _database.default)('events').where(eventOptions).then(function (rows) {
            return rows.map(function (_ref7) {
              var value = _ref7.value;
              return Number(value);
            });
          }));

        case 7:
          _ref5 = _context3.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          currentPage = _ref6[0];

          if (!(currentPage === undefined)) {
            _context3.next = 13;
            break;
          }

          _context3.next = 13;
          return regeneratorRuntime.awrap((0, _database.default)('events').insert(_objectSpread({}, eventOptions, {
            value: '0'
          })));

        case 13:
          _context3.next = 15;
          return regeneratorRuntime.awrap(addCardsFromPage(currentPage || 0));

        case 15:
          hasNext = _context3.sent;
          _context3.next = 18;
          return regeneratorRuntime.awrap((0, _database.default)('events').where(eventOptions).update({
            value: hasNext ? String(currentPage + 1) : '0'
          }));

        case 18:
          _context3.next = 4;
          break;

        case 20:
          console.info('Finished updating cards after', Math.round((Date.now() - start) / (1000 * 60)), 'minutes');

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var _default = updateCards;
exports.default = _default;