
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
    tbl.increments('id');
    tbl.string('username', 255)
      .unique()
      .notNullable()
    tbl.string('password', 255).notNullable();
  })

  .createTable('sleeptracker', tbl => {
    tbl.increments('id');
    tbl.datetime('start_time', {precision: 6});
    tbl.datetime('end_time', {precision: 6});
    tbl.integer('total_hours').notNullable();
    tbl.integer('awakeness').notNullable();
    tbl.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })

  .createTable('averagesleep', tbl => {
    tbl.increments('id');
    tbl.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    tbl.integer('total_hours_average');
    tbl.integer('awakeness_average');
  })

};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('averagesleep')
  .dropTableIfExists('sleeptracker')
  .dropTableIfExists('users')
};
