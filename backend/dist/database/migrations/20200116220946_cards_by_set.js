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
          return regeneratorRuntime.awrap(knex.schema.raw("\n  CREATE VIEW \"cardsBySet\" AS \n  SELECT oracle_id, ARRAY_AGG(DISTINCT CONCAT(set)) AS all_sets\n  FROM cards \n  GROUP BY oracle_id; "));

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
          return regeneratorRuntime.awrap(knex.schema.raw("\n    DROP VIEW \"cardsBySet\"\n  "));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.down = down;