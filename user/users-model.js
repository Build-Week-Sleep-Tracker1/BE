const db = require('../database/dbConfig.js');

module.exports = {
  add,
  addSleepEntry,
  findBy,
  findById,
  findSleepListById,
  findSleepEntryById,
  updateSleepEntry,
  removeSleepEntry,
}

async function add(user){
  try {
    const [id] = await db('users').insert(user, "id");
    return user
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

async function addSleepEntry(sleepentry){
  try {
  const [sleepid] = await db('sleeptracker').insert(sleepentry, 'id')
  // const [average] = await db('averagesleep').insert(sleepentry.user_id, sleepentry.awakeness, 'id')
    return {sleepentry, sleepid}
  } catch (error) {
    throw error;
  }
}

function findSleepEntryById(user_id, id) {
  return db('sleeptracker as s')
  .select('s.id','s.user_id','s.start_time', 's.end_time', 's.total_hours', 's.awakeness')
  .where({user_id: user_id, id: id}).first()
}

function findSleepListById(id) {
  return db('sleeptracker as s')
  .join('users as u', 's.user_id', 'u.id')
  .select('s.id','s.user_id','s.start_time', 's.end_time', 's.total_hours', 's.awakeness')
  .where({user_id: id})
}

function updateSleepEntry(user_id, id, changes) {
  return db('sleeptracker')
  .where({ user_id: user_id, id: id }).first()
  .update(changes)
}

function removeSleepEntry(user_id, id) {
  return db('sleeptracker')
  .where({user_id: user_id, id: id})
  .del();
}
