"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = {
  Query: {
    user: function user(_, test, _ref) {
      var _user, db, _ref2, _ref3, dbUser;

      return regeneratorRuntime.async(function user$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _user = _ref.user, db = _ref.db;
              _context.next = 3;
              return regeneratorRuntime.awrap(db('users').where({
                id: _user.id
              }));

            case 3:
              _ref2 = _context.sent;
              _ref3 = _slicedToArray(_ref2, 1);
              dbUser = _ref3[0];
              return _context.abrupt("return", dbUser);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }
};
exports.default = _default;