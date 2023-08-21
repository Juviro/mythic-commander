export const up = async (knex) => {
  await knex.schema.raw(
    "UPDATE \"defaultTags\" SET tags = array_replace(tags, 'Card Draw', 'Card Advantage');"
  );
  await knex.schema.raw(
    "UPDATE \"cardToDeck\" SET tags = array_replace(tags, 'Card Draw', 'Card Advantage');"
  );
};

export const down = async (knex) => {
  await knex.schema.raw(
    "UPDATE \"defaultTags\" SET tags = array_replace(tags, 'Card Advantage', 'Card Draw');"
  );
  await knex.schema.raw(
    "UPDATE \"cardToDeck\" SET tags = array_replace(tags, 'Card Advantage', 'Card Draw');"
  );
};
