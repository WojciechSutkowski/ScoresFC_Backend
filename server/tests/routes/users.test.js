const request = require('supertest');
const app = require('../../index.js');

////////////////////////
// POST /register-admin
////////////////////////
describe('POST /register-admin', () => {
  describe('given firstname, lastname, username, email and password', () => {
    test('should respond with 201 code', async () => {
      const response = await request(app).post('/users/register-admin').send({
        firstname: 'test first',
        lastname: 'test last',
        username: 'test admin',
        email: 'admin@test.com',
        role: 'admin',
        password: 'test',
      });
      expect(response.statusCode).toBe(201);
    });
  });

  describe('given already taken email', () => {
    test('should respond with 400 code', async () => {
      const response = await request(app).post('/users/register-admin').send({
        firstname: 'test first',
        lastname: 'test last',
        username: 'test admin 2',
        email: 'admin@test.com',
        role: 'admin',
        password: 'test',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('given already taken username', () => {
    test('should respond with 400 code', async () => {
      const response = await request(app).post('/users/register-admin').send({
        firstname: 'test first',
        lastname: 'test last',
        username: 'test admin',
        email: 'admin2@test.com',
        role: 'admin',
        password: 'test',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('not given username', () => {
    test('should respond with 500 code', async () => {
      const response = await request(app).post('/users/register-admin').send({
        firstname: 'test first',
        lastname: 'test last',
        email: 'admin@test.com',
        role: 'admin',
        password: 'test',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('not given password', () => {
    test('should respond with 500 code', async () => {
      const response = await request(app).post('/users/register-admin').send({
        firstname: 'test first',
        lastname: 'test last',
        username: 'test admin',
        email: 'admin@test.com',
        role: 'admin',
      });
      expect(response.statusCode).toBe(400);
    });
  });
});

////////////////////////
// POST /register-user
////////////////////////
describe('POST /register-user', () => {
  describe('given firstname, lastname, username, email and password', () => {
    test('should respond with 201 code', async () => {
      const response = await request(app).post('/users/register-user').send({
        firstname: 'test first',
        lastname: 'test last',
        username: 'test user',
        email: 'user@test.com',
        role: 'user',
        password: 'test',
      });
      expect(response.statusCode).toBe(201);
    });
  });

  describe('given already taken email', () => {
    test('should respond with 400 code', async () => {
      const response = await request(app).post('/users/register-user').send({
        firstname: 'test first',
        lastname: 'test last',
        username: 'test user 2',
        email: 'user@test.com',
        role: 'user',
        password: 'test',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('given already taken username', () => {
    test('should respond with 400 code', async () => {
      const response = await request(app).post('/users/register-user').send({
        firstname: 'test first',
        lastname: 'test last',
        username: 'test admin',
        email: 'user2@test.com',
        role: 'user',
        password: 'test',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('not given username', () => {
    test('should respond with 500 code', async () => {
      const response = await request(app).post('/users/register-user').send({
        firstname: 'test first',
        lastname: 'test last',
        email: 'user@test.com',
        role: 'user',
        password: 'test',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('not given password', () => {
    test('should respond with 500 code', async () => {
      const response = await request(app).post('/users/register-user').send({
        firstname: 'test first',
        lastname: 'test last',
        username: 'test user',
        email: 'user@test.com',
        role: 'user',
      });
      expect(response.statusCode).toBe(400);
    });
  });
});

////////////////////////
// POST /login-admin
////////////////////////
describe('POST /login-admin', () => {
  describe('given username and password', () => {
    test('should respond with 200 code', async () => {
      const response = await request(app).post('/users/login-admin').send({
        username: 'test admin',
        password: 'test',
        role: 'admin',
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('given wrong password', () => {
    test('should respond with 403 code', async () => {
      const response = await request(app).post('/users/login-admin').send({
        username: 'test admin',
        password: 'test bad password',
        role: 'admin',
      });
      expect(response.statusCode).toBe(403);
    });
  });

  describe('given wrong username', () => {
    test('should respond with 404 code', async () => {
      const response = await request(app).post('/users/login-admin').send({
        username: 'test admin uncreated account',
        password: 'test',
        role: 'admin',
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('given wrong role account', () => {
    test('should respond with 403 code', async () => {
      const response = await request(app).post('/users/login-admin').send({
        username: 'test user',
        password: 'test',
        role: 'user',
      });
      expect(response.statusCode).toBe(403);
    });
  });
});

////////////////////////
// POST /login-user
////////////////////////
describe('POST /login-user', () => {
  describe('given username and password', () => {
    test('should respond with 200 code', async () => {
      const response = await request(app).post('/users/login-user').send({
        username: 'test user',
        password: 'test',
        role: 'user',
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('given wrong password', () => {
    test('should respond with 403 code', async () => {
      const response = await request(app).post('/users/login-user').send({
        username: 'test user',
        password: 'test bad password',
        role: 'user',
      });
      expect(response.statusCode).toBe(403);
    });
  });

  describe('given wrong username', () => {
    test('should respond with 404 code', async () => {
      const response = await request(app).post('/users/login-user').send({
        username: 'test user uncreated account',
        password: 'test',
        role: 'user',
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('given wrong role account', () => {
    test('should respond with 403 code', async () => {
      const response = await request(app).post('/users/login-user').send({
        username: 'test admin',
        password: 'test',
        role: 'admin',
      });
      expect(response.statusCode).toBe(403);
    });
  });
});

////////////////////////
// POST /favourite-leagues
////////////////////////
describe('POST /favourite-leagues', () => {
  describe('given user username', () => {
    test('should respond with 200 code', async () => {
      const response = await request(app)
        .post('/users/favourite-leagues')
        .send({
          username: 'test user',
          leagueId: '123',
        });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('given username that do not exist', () => {
    test('should respond with 404 code', async () => {
      const response = await request(app)
        .post('/users/favourite-leagues')
        .send({
          username: 'test not found username',
          leagueId: '123',
        });

      expect(response.statusCode).toBe(404);
    });
  });
});

////////////////////////
// POST /favourite-games
////////////////////////
describe('POST /favourite-games', () => {
  describe('given user username', () => {
    test('should respond with 200 code', async () => {
      const response = await request(app).post('/users/favourite-games').send({
        username: 'test user',
        gameId: '123',
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('given username that do not exist', () => {
    test('should respond with 404 code', async () => {
      const response = await request(app).post('/users/favourite-games').send({
        username: 'test not found username',
        gameId: '123',
      });

      expect(response.statusCode).toBe(404);
    });
  });
});

////////////////////////
// POST /favourite-teams
////////////////////////
describe('POST /favourite-teams', () => {
  describe('given user username', () => {
    test('should respond with 200 code', async () => {
      const response = await request(app).post('/users/favourite-teams').send({
        username: 'test user',
        teamId: '123',
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('given username that do not exist', () => {
    test('should respond with 404 code', async () => {
      const response = await request(app).post('/users/favourite-teams').send({
        username: 'test not found username',
        teamId: '123',
      });

      expect(response.statusCode).toBe(404);
    });
  });
});

////////////////////////
// GET /favourites
////////////////////////
describe('POST /favourites', () => {
  describe('given user username', () => {
    test('should respond with 401 code (unauthorized)', async () => {
      const response = await request(app).post('/users/favourites').send({
        username: 'test user',
      });
      expect(response.statusCode).toBe(401);
    });
  });

  describe('given username that do not exist', () => {
    test('should respond with 404 code', async () => {
      const response = await request(app).get('/users/favourites').query({
        username: 'test not found username',
      });

      expect(response.statusCode).toBe(404);
    });
  });
});

////////////////////////
// DELETE /favourite-leagues
////////////////////////
describe('DELETE /favourite-leagues', () => {
  describe('given user username', () => {
    test('should respond with 200 code', async () => {
      const response = await request(app)
        .delete('/users/favourite-leagues')
        .query({
          username: 'test user',
          leagueId: '123',
        });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('given username that do not exist', () => {
    test('should respond with 404 code', async () => {
      const response = await request(app)
        .delete('/users/favourite-leagues')
        .query({
          username: 'test not found username',
          leagueId: '123',
        });
      expect(response.statusCode).toBe(404);
    });
  });
});

////////////////////////
// DELETE /favourite-games
////////////////////////
describe('DELETE /favourite-games', () => {
  describe('given user username', () => {
    test('should respond with 200 code', async () => {
      const response = await request(app)
        .delete('/users/favourite-games')
        .query({
          username: 'test user',
          gameId: '123',
        });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('given username that do not exist', () => {
    test('should respond with 404 code', async () => {
      const response = await request(app)
        .delete('/users/favourite-games')
        .query({
          username: 'test not found username',
          gameId: '123',
        });
      expect(response.statusCode).toBe(404);
    });
  });
});

////////////////////////
// DELETE /favourite-teams
////////////////////////
describe('DELETE /favourite-teams', () => {
  describe('given user username', () => {
    test('should respond with 200 code', async () => {
      const response = await request(app)
        .delete('/users/favourite-teams')
        .query({
          username: 'test user',
          teamId: '123',
        });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('given username that do not exist', () => {
    test('should respond with 404 code', async () => {
      const response = await request(app)
        .delete('/users/favourite-teams')
        .query({
          username: 'test not found username',
          teamId: '123',
        });
      expect(response.statusCode).toBe(404);
    });
  });
});

////////////////////////
// DELETE /delete
////////////////////////
describe('DELETE /delete', () => {
  describe('given admin username', () => {
    test('should respond with 200 code', async () => {
      const response = await request(app).delete('/users/delete').query({
        username: 'test admin',
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('given user username', () => {
    test('should respond with 200 code', async () => {
      const response = await request(app).delete('/users/delete').query({
        username: 'test user',
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('given username that do not exist', () => {
    test('should respond with 404 code', async () => {
      const response = await request(app).delete('/users/delete').query({
        username: 'test not found username',
      });
      expect(response.statusCode).toBe(404);
    });
  });
});
