
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
    tbl.increments();
    tbl.datetime('start_time', {precision: 6});
    tbl.datetime('end_time', {precision: 6});
    tbl.integer('total_hours');
    tbl.integer('awakeness');
    tbl.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })

};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('sleeptracker')
  .dropTableIfExists('users')
};
