exports.seed = async function (knex) {
  await knex('sleeptracker').insert([
    { start_time: "2020-08-25 22:47:47", end_time: "2020-08-26 08:00:00", total_hours: 10, awakeness: 4, user_id: 1 },
    { start_time: "2020-08-26 22:47:47", end_time: "2020-08-27 08:00:00", total_hours: 10, awakeness: 4, user_id: 1 },
    { start_time: "2020-08-25 20:00:00", end_time: "2020-08-26 07:00:00", total_hours: 8, awakeness: 3, user_id: 2 },
    { start_time: "2020-08-26 22:47:47", end_time: "2020-08-27 08:00:00", total_hours: 10, awakeness: 3, user_id: 2 },
    { start_time: "2020-08-25 22:47:47", end_time: "2020-08-26 08:00:00", total_hours: 10, awakeness: 4, user_id: 3 },
    { start_time: "2020-08-26 22:47:47", end_time: "2020-08-27 08:00:00", total_hours: 10, awakeness: 4, user_id: 3 },
  ])
}
