"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _knex = _interopRequireDefault(require("knex"));

var _knexfile = _interopRequireDefault(require("../../knexfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'development';
var configOptions = _knexfile.default[env];
var db = (0, _knex.default)(configOptions);
var _default = db;
exports.default = _default;