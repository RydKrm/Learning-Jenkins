
const request = require('supertest');
const app = require('../../index');

describe('Product API', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'admin@example.com',
      password: '123456',
    });
    token = res.body.token;
  });

  it('should get all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a product by ID', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual('1');
  });

  it('should not get a product with an invalid ID', async () => {
    const res = await request(app).get('/api/products/999');
    expect(res.statusCode).toEqual(404);
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        price: 99.99,
        description: 'Test Description',
        image: '/images/test.jpg',
        brand: 'Test Brand',
        category: 'Test Category',
        countInStock: 10,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual('Test Product');
  });

  it('should update a product', async () => {
    const res = await request(app)
      .put('/api/products/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Product',
        price: 199.99,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Updated Product');
  });

  it('should delete a product', async () => {
    const res = await request(app)
      .delete('/api/products/6')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Product removed');
  });
});
