"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _User = _interopRequireDefault(require("./User/"));

var _Deck = _interopRequireDefault(require("./Deck/"));

var _Session = _interopRequireDefault(require("./Session/"));

var _Collection = _interopRequireDefault(require("./Collection/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDefs = [_User.default, _Deck.default, _Session.default, _Collection.default];

var _default = (0, _mergeGraphqlSchemas.mergeTypes)(typeDefs, {
  all: true
});

exports.default = _default;