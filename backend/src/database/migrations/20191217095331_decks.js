const CITY_OF_BRASS_ART =
  'https://img.scryfall.com/cards/art_crop/front/4/5/459042ef-0d5b-480f-9b8a-520e13ae9217.jpg';

export const up = async knex => {
  await knex.schema.createTable('decks', table => {
    table.increments();
    table
      .string('userId')
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE');
    table
      .string('name')
      .notNullable()
      .defaultTo('New Deck');
    table.string('imgSrc').defaultTo(CITY_OF_BRASS_ART);
    table.timestamp('lastEdit').defaultTo(knex.fn.now());
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
  await knex.schema.createTable('cardToDeck', table => {
    table
      .integer('deckId')
      .unsigned()
      .notNullable()
      .references('decks.id')
      .onDelete('CASCADE');
    table.string('cardId').notNullable();
    table.enu('zone', ['MAINBOARD', 'SIDEBOARD', 'MAYBEBOARD', 'COMMANDER']);
    table.primary(['deckId', 'cardId']);
  });
};

export const down = async knex => {
  await knex.schema.dropTable('cardToDeck');
  await knex.schema.dropTable('decks');
};
