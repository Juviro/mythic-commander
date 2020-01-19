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
          return regeneratorRuntime.awrap(knex.schema.createTable('cards', function (table) {
            _cardFields.CARD_FIELDS_INITIAL.forEach(function (_ref) {
              var key = _ref.key,
                  type = _ref.type,
                  specificType = _ref.specificType,
                  length = _ref.length;

              if (type) {
                table[type](key, length);
              } else if (specificType) {
                table.specificType(key, specificType);
              }
            });

            table.timestamp('lastUpdate').defaultTo(knex.fn.now());
            table.primary(['id']);
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
          return regeneratorRuntime.awrap(knex.schema.dropTable('cards'));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.down = down;