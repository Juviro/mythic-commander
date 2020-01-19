"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _User = _interopRequireDefault(require("./User/"));

var _Collection = _interopRequireDefault(require("./Collection/"));

var _Session = _interopRequireDefault(require("./Session/"));

var _Deck = _interopRequireDefault(require("./Deck/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolvers = [_User.default, _Collection.default, _Session.default, _Deck.default];

var _default = (0, _mergeGraphqlSchemas.mergeResolvers)(resolvers);

exports.default = _default;