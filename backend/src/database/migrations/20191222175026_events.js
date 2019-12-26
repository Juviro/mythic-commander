exports.up = async knex => {
  await knex.schema.createTable('events', table => {
    table
      .string('key')
      .notNullable()
      .primary()
    table.string('value').notNullable()
  })
}

exports.down = async knex => {
  await knex.schema.dropTable('events')
}
