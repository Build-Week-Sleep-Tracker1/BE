const db = require('../database/dbConfig.js');

module.exports = {
  add,
  addSleepTime,
  findBy,
  findById,
  findSleepListById,
  updateSleepTime,
  removeSleepTime,
}

async function add(user){
  try {
    const [id] = await db('users').insert(user, "id");
    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findBy(filter) {
  return db('users').where(filter).orderBy("id");
}

function findById(id){
  return db('users').where({ id }).first();
}

async function addSleepTime(timeslept){
  try {
    const [id] = await db('sleeptracker').inser(timeslept, id);

    return findSleepTimeById(id);
  } catch (error) {
    throw error;
  }
}

function findSleepTimeById(id) {
  return db('sleeptracker').where({ id }).first()
}

function findSleepListById(id) {
  return db('sleeptrackere as s')
  .join('users as u', 's.user_id', 'u.id')
  .select('s.user_id')
}

function updateSleepTime(id, changes) {
  return db('sleeptracker')
  .where({ id })
  .update(changes)
}

function removeSleepTime(id) {
  return db('sleeptracker')
  .where('id', id)
  .del();
}
