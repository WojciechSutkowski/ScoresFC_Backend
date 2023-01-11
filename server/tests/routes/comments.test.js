const request = require('supertest');
const app = require('../../index.js');

////////////////////////
// GET / (All comments)
////////////////////////
describe('GET /', () => {
  describe('get all comments', () => {
    test('should respond with 200 code', async () => {
      const response = await request(app).get('/comments/');
      expect(response.statusCode).toBe(200);
    });
  });
});

////////////////////////
// POST /create
////////////////////////
describe('POST /create', () => {
  describe('given username, gameId and comment', () => {
    test('should respond with 401 code (unauthorized)', async () => {
      const response = await request(app).post('/comments/create').send({
        username: 'admin',
        gameId: '1',
        comment: 'Jest testing comment',
      });

      expect(response.statusCode).toBe(401);
    });
  });
});

////////////////////////
// GET /:gameId
////////////////////////
describe('GET /:gameId', () => {
  describe('get game comments', () => {
    test('should respond with 200 code', async () => {
      const response = await request(app).get('/comments/', {
        params: {
          gameId: '123',
        },
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
