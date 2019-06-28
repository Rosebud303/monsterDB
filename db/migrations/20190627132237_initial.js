
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('monsterspecies', table => {
      table.increments('id').primary();
      table.string('species');
      table.string('description');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('monsters', table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('species_id').unsigned();
      table.foreign('species_id')
        .references('monsterspecies.id');
      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('monsters'),
    knex.schema.dropTable('monsterspecies')
  ])
};
