"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deleteSessions = function deleteSessions() {
  _database.default.raw('DELETE FROM sessions WHERE expires < NOW()');
};

var _default = deleteSessions;
exports.default = _default;