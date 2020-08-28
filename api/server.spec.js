const server = require('./server.js');
const db = require('../database/dbConfig.js')
const request = require('supertest');
const Users = require('../user/users-model.js');
const bcryptjs = require('bcryptjs');

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
      it('should return an OK when attemtping to Login', async () => {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync("abc123", rounds);

        await Users.add({username: 'test', password:(hash)});

        const response = await request(server)
        .post('/api/auth/login')
        .send({username: 'test', password: "abc123"})
        console.log(response.body.token)
        expect(response.status).toBe(200);
    });
  });
});
  describe('add()', () => {
    beforeEach(async () => {
      await db('users').truncate();
    })
      it ('should insert usernames into the database', async () => {
        await Users.add({username: 'test', password: 'test'});
        await Users.add({username: 'test2', password: 'test2'});

        const User = await db('users');
        expect(User).toHaveLength(2);
      });

      it('should return what was added', async () => {

        let user = await Users.add({username: 'test', password: 'test'});
        expect(user.username).toBe('test');

        user = await Users.add({username: 'test2', password: 'test2'});
        expect(user.username).toBe('test2');
      });

      it('Posts to /users/:id/sleeptracker, should return json object',() => {
        return request(server)
        .post('/api/users/:id/sleeptracker')
        .send({start_time: new Date(), end_time: "", user_id: 1, total_hours: 1, awakeness: 4})
        .then(res => {
          expect(res.type).toMatch(/json/i)
        })
      })
    })
