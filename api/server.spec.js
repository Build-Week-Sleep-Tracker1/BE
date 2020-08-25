const server = require('./server.js');
const db = require('../database/dbConfig.js')
const request = require('supertest');

describe('server testing', () => {
  test('should be in the testing enviornment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })
})
describe('Testing Endpoints', () => {
  describe('Post Test to Login and Register', () => {
    beforeAll(async () => {
      await db('users').truncate();
    })
    it('Posts to auth/register, should return 201', () => {
      return request(server)
      .post('/api/auth/register')
      .send({ username: "henry", password: 'chicken' })
      .then(res =>
        {
          expect(res.status).toBe(201);
        })
      })
      it('Posts to /auth/register, should return json object', () => {
        return request(server)
        .post('/api/auth/register')
        .send({username: 'frank', password: 'torch'})
        .then(res => {
          expect(res.type).toMatch(/json/i);
        })
      })
      it('Posts to /auth/login allows sign in, should return 200', () => {
        return request(server)
        .post('/api/auth/login')
        .send({username: 'henry', password: 'chicken'})
        .then(res => {
          expect(res.status).toBe(200);
        })
      })
      it('Posts to /auth/login, returns json object', () => {
        return request(server)
        .post('/api/auth/login')
        .send({username: 'henry', password: 'chicken'})
        .then(res => {
          expect(res.type).toMatch(/json/i)
        })
      })
    })
    describe('Posts to Sleeptracker', () => {
      it('Posts to /users/:id/sleeptracker, shoudl return json object',() => {
        return request(server)
        .post('/api/users/:id/sleeptracker')
        .send({user_id: 1, total_hours: 1, awakeness: 4})
        .then(res => {
          expect(res.type).toMatch(/json/i)
        })
      })
    })
  });
