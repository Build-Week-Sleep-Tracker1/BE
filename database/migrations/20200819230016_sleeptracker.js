
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
    tbl.increments();
    tbl.string('username', 255)
      .unique()
      .notNullable().index();
    tbl.string('password', 255).notNullable();
  })
  .createTable('sleeptracker', tbl => {
    tbl.increments();
    tbl.datetime('start_time').notNullable()
    tbl.datetime('end_time').notNullable()
    tbl.integer('total_hours').notNullable()
    tbl.integer('awakeness').notNullable()
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })

};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('sleeptracker')
  .dropTableIfExists('users')
};
