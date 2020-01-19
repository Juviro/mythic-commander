"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = validateToken;
exports.getSession = void 0;

var _crypto = require("crypto");

var _googleAuthLibrary = require("google-auth-library");

var TOKEN_EXPIRATION = 365 * 24 * 60 * 60 * 1000;
var CLIENT_ID = '985753697547-184gkcavnrc8f4flq1tdjra30amuchgo.apps.googleusercontent.com';
var client = new _googleAuthLibrary.OAuth2Client(CLIENT_ID);

function validateToken(token) {
  var ticket, payload, id, name, email, avatar;
  return regeneratorRuntime.async(function validateToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID
          }));

        case 2:
          ticket = _context.sent;
          payload = ticket.getPayload();
          id = payload.sub;
          name = payload.given_name;
          email = payload.email;
          avatar = payload.picture;
          return _context.abrupt("return", {
            id: id,
            email: email,
            name: name,
            avatar: avatar
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

var getSession = function getSession(userId) {
  var sessionId = (0, _crypto.randomBytes)(30).toString('hex');
  var expires = new Date(Date.now() + TOKEN_EXPIRATION);
  return {
    sessionId: sessionId,
    expires: expires,
    userId: userId
  };
};

exports.getSession = getSession;