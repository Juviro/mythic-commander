import { CARD_FIELDS } from '../cardFields'

exports.up = async knex => {
  await knex.schema.createTable('cards', table => {
    CARD_FIELDS.forEach(({ key, type, specificType, length, defaultTo }) => {
      if (type) {
        table[type](key, length)
      } else if (specificType) {
        table.specificType(key, specificType)
      }
    })
    table.timestamp('lastUpdate').defaultTo(knex.fn.now())
    table.primary(['id'])
  })
}

exports.down = async knex => {
  await knex.schema.dropTable('cards')
}
