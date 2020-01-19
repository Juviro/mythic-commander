"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;

var up = function up(knex) {
  return regeneratorRuntime.async(function up$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(knex.schema.alterTable('cardToDeck', function (table) {
            table.integer('amount').defaultsTo(1).notNullable();
            table.string('oracle_id').notNullable();
            table.dropPrimary();
            table.primary(['oracle_id', 'deckId']);
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
          return regeneratorRuntime.awrap(knex.schema.alterTable('cardToDeck', function (table) {
            table.dropColumn('amount');
            table.dropColumn('oracle_id');
            table.dropPrimary();
            table.primary(['deckId', 'cardId']);
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.down = down;