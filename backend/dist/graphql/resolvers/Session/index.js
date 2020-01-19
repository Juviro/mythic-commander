"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = require("../../../auth");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = {
  Mutation: {
    login: function login(_, _ref, _ref2) {
      var token, db, user, _ref3, _ref4, dbUser, session;

      return regeneratorRuntime.async(function login$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = _ref.token;
              db = _ref2.db;
              _context.next = 4;
              return regeneratorRuntime.awrap((0, _auth.validateToken)(token));

            case 4:
              user = _context.sent;
              _context.next = 7;
              return regeneratorRuntime.awrap(db('users').where({
                id: user.id
              }));

            case 7:
              _ref3 = _context.sent;
              _ref4 = _slicedToArray(_ref3, 1);
              dbUser = _ref4[0];

              if (dbUser) {
                _context.next = 13;
                break;
              }

              _context.next = 13;
              return regeneratorRuntime.awrap(db('users').insert(user));

            case 13:
              // TODO delete old sessions
              session = (0, _auth.getSession)(user.id);
              _context.next = 16;
              return regeneratorRuntime.awrap(db('sessions').insert(session));

            case 16:
              return _context.abrupt("return", {
                session: session.sessionId
              });

            case 17:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    logout: function logout(_, _1, _ref5) {
      var user, db, session;
      return regeneratorRuntime.async(function logout$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              user = _ref5.user, db = _ref5.db, session = _ref5.session;
              _context2.next = 3;
              return regeneratorRuntime.awrap(db('sessions').where({
                id: user.id
              }).del());

            case 3:
              return _context2.abrupt("return", session);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }
};
exports.default = _default;