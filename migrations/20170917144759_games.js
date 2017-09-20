exports.up = function (knex, Promise) {
  return knex.schema.createTable('games', function (table) {
    table.increments('id').primary()
    table.string('tiles')
    table.string('movements')
    table.string('start')
    table.boolean('completed')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('games')
}
