exports.up = function (knex, Promise) {
  return knex.schema.createTable('games', function (table) {
    table.increments('id').primary()
    table.string('terrain', 500)
    table.string('moves', 500)
    table.integer('width')
    table.integer('height')
    table.boolean('failed')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('games')
}
