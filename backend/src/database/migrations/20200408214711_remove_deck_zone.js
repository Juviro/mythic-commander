export const up = async knex => {
  await knex.raw('ALTER TABLE "cardToDeck" DROP COLUMN zone CASCADE');
  await knex.schema.alterTable('cardToDeck', table => {
    table.boolean('isCommander');
  });
};

export const down = async knex => {
  await knex.schema.alterTable('cardToDeck', table => {
    table.enum('zone', ['MAINBOARD', 'SIDEBOARD', 'MAYBEBOARD', 'COMMANDER']);
    table.dropColumn('isCommander');
  });
};
