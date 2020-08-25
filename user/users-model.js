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

async function addSleepEntry(sleepentry, id){
  try {
  const [sleepid] = await db('sleeptracker').insert(sleepentry, 'id')
  // const [average] = await db('averagesleep').insert(sleepentry.user_id, sleepentry.awakeness, 'id')
    return db('sleeptracker as s')
    .join('users as u', 'u.id', 's.user_id')
    .select('s.id','s.user_id','u.username','s.start_time', 's.end_time', 's.total_hours', 's.awakeness')
    .where({'s.id': sleepid}).first()
  } catch (error) {
    throw error;
  }
}

function findSleepEntryById(user_id, id) {
  return db('sleeptracker as s')
  .join('users as u', 's.user_id', 'u.id')
  .select('s.id','s.user_id','u.username','s.start_time', 's.end_time', 's.total_hours', 's.awakeness')
  .where({'u.id': user_id, 's.id': id}).first()
}

function findSleepListById(id) {
  return db('sleeptracker as s')
  .join('users as u', 's.user_id', 'u.id')
  .select('s.id','s.user_id', 'u.username','s.start_time', 's.end_time', 's.total_hours', 's.awakeness')
  .where({'u.id': id})
}

async function updateSleepEntry(user_id, id, changes) {
  try {
    const newentry = await db('sleeptracker').update(changes, 'id')
      return db('sleeptracker as s')
      .join('users as u', 's.user_id', 'u.id')
      .select('s.id','s.user_id', 'u.username','s.start_time', 's.end_time', 's.total_hours', 's.awakeness')
      .where({ 's.user_id': user_id, 's.id': id })
    } catch (error) {
      throw error
    }
  }

function removeSleepEntry(user_id, id) {
  return db('sleeptracker')
  .where({user_id: user_id, id: id})
  .del();
}
