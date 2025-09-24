
const request = require('supertest');
const app = require('../../index');

describe('User API', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'admin@example.com',
      password: '123456',
    });
    token = res.body.token;
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/users').send({
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should not register a user with an existing email', async () => {
    const res = await request(app).post('/api/users').send({
      name: 'Admin User',
      email: 'admin@example.com',
      password: '123456',
    });
    expect(res.statusCode).toEqual(400);
  });

  it('should login a user with correct credentials', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'admin@example.com',
      password: '123456',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login a user with incorrect credentials', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'admin@example.com',
      password: 'wrongpassword',
    });
    expect(res.statusCode).toEqual(401);
  });

  it('should get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a user by ID', async () => {
    const res = await request(app)
      .get('/api/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual('1');
  });

  it('should not get a user with an invalid ID', async () => {
    const res = await request(app)
      .get('/api/users/999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put('/api/users/2')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated User',
        email: 'updated@example.com',
        isAdmin: false,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Updated User');
  });

  it('should delete a user', async () => {
    const res = await request(app)
      .delete('/api/users/3')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User removed');
  });
});
