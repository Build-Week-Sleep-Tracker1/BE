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
      await db('users').truncate
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
    })
  }); 
