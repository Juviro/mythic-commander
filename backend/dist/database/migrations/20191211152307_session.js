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
          return regeneratorRuntime.awrap(knex.schema.createTable('sessions', function (table) {
            table.increments();
            table.string('userId').notNullable().references('users.id').onDelete('CASCADE');
            table.string('sessionId').notNullable();
            table.timestamp('expires');
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
          return regeneratorRuntime.awrap(knex.schema.dropTable('sessions'));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.down = down;