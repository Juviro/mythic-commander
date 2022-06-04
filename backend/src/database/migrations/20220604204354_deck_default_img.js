const CITY_OF_BRASS_ART = "https://mythic-commander.com/img/459042ef-0d5b-480f-9b8a-520e13ae9217_art_crop_front.avif"

export const up = async knex => {
  await knex.schema.alterTable('decks', table => {
    table.string('imgSrc').defaultTo(CITY_OF_BRASS_ART).alter();
  });
};

// eslint-disable-next-line
export const down = async () => {};
