"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n  type Session {\n    userId: String!\n    sessionId: String!\n    expires: String\n  }\n\n  type LoginResponse {\n    session: String!\n  }\n\n  type Mutation {\n    login(token: String): LoginResponse!\n    logout: Boolean\n  }\n";
exports.default = _default;