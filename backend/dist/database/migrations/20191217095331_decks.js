"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.down = exports.up = void 0;
var CITY_OF_BRASS_ART = 'https://img.scryfall.com/cards/art_crop/front/4/5/459042ef-0d5b-480f-9b8a-520e13ae9217.jpg';

var up = function up(knex) {
  return regeneratorRuntime.async(function up$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(knex.schema.createTable('decks', function (table) {
            table.increments();
            table.string('userId').notNullable().references('users.id').onDelete('CASCADE');
            table.string('name').notNullable().defaultTo('New Deck');
            table.string('imgSrc').defaultTo(CITY_OF_BRASS_ART);
            table.timestamp('lastEdit').defaultTo(knex.fn.now());
            table.timestamp('createdAt').defaultTo(knex.fn.now());
          }));

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(knex.schema.createTable('cardToDeck', function (table) {
            table.integer('deckId').unsigned().notNullable().references('decks.id').onDelete('CASCADE');
            table.string('cardId').notNullable();
            table.enu('zone', ['MAINBOARD', 'SIDEBOARD', 'MAYBEBOARD', 'COMMANDER']);
            table.primary(['deckId', 'cardId']);
          }));

        case 4:
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
          return regeneratorRuntime.awrap(knex.schema.dropTable('cardToDeck'));

        case 2:
          _context2.next = 4;
          return regeneratorRuntime.awrap(knex.schema.dropTable('decks'));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.down = down;