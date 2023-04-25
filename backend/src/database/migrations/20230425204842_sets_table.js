export const up = async (knex) => {
  await knex.schema.createTable('sets', (table) => {
    table.string('id').notNullable().primary();
    table.string('code').notNullable();
    table.string('name').notNullable();
    table.string('released_at').notNullable();
    table.string('set_type').notNullable();
    table.integer('card_count').notNullable();
    table.string('parent_set_code');
    table.boolean('nonfoil_only');
    table.boolean('foil_only');
    table.string('icon_svg_uri').notNullable();
    table.timestamp('lastUpdate').defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('sets');
};
