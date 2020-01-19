"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var _cardFields = require("../cardFields");

var up = function up(knex) {
  return regeneratorRuntime.async(function up$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(knex.schema.alterTable('cards', function (table) {
            _cardFields.CARD_FIELDS_ADDITION_1.forEach(function (_ref) {
              var key = _ref.key,
                  type = _ref.type,
                  length = _ref.length;
              table[type](key, length);
            });
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.up = up;

var down = function down(knex) {
  return regeneratorRuntime.async(function down$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(knex.schema.alterTable('cards', function (table) {
            _cardFields.CARD_FIELDS_ADDITION_1.forEach(function (_ref2) {
              var key = _ref2.key;
              table.dropColumn(key);
            });
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.down = down;