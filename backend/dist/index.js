"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _server = _interopRequireDefault(require("./server"));

require("./cron");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa.default();

_server.default.applyMiddleware({
  app: app
});

app.listen({
  port: 4000
}, function () {
  return console.info("\uD83D\uDE80 Server ready at http://localhost:4000".concat(_server.default.graphqlPath));
});