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
          return regeneratorRuntime.awrap(knex.schema.createTable('collection', function (table) {
            table.string('id');
            table.string('userId');
            table.string('set');
            table.boolean('isFoil');
            table.integer('amount');
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.foreign('userId').references('users.id');
            table.primary(['id', 'userId', 'set', 'isFoil']);
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
          return regeneratorRuntime.awrap(knex.schema.dropTable('collection'));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.down = down;