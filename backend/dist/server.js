"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apolloServerKoa = require("apollo-server-koa");

var _graphql = _interopRequireDefault(require("./graphql"));

var _database = _interopRequireDefault(require("./database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = new _apolloServerKoa.ApolloServer({
  schema: _graphql.default,
  context: function context(_ref) {
    var ctx, header, isLogin, sessionId, context, _ref2, _ref2$rows, user;

    return regeneratorRuntime.async(function context$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx = _ref.ctx;
            header = ctx.request.header;
            isLogin = ctx.response.request.body.operationName === 'login';
            sessionId = header.authorization.split(' ')[1];
            context = {
              db: _database.default,
              session: {
                id: sessionId
              }
            };

            if (!isLogin) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", context);

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(_database.default.raw("SELECT users.* \n      FROM users \n      INNER JOIN sessions \n      ON users.id = sessions.\"userId\" \n      AND sessions.expires > NOW()\n      AND sessions.\"sessionId\" = ?", [sessionId]));

          case 9:
            _ref2 = _context.sent;
            _ref2$rows = _slicedToArray(_ref2.rows, 1);
            user = _ref2$rows[0];

            if (user) {
              _context.next = 14;
              break;
            }

            throw new _apolloServerKoa.AuthenticationError('invalid token');

          case 14:
            return _context.abrupt("return", _objectSpread({}, context, {
              user: user
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  formatError: function formatError(error) {
    console.error('error', error);
    return error;
  },
  playground: 'api/graphql'
});

exports.default = _default;