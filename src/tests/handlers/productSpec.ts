import app from '../../server';
import supertest from 'supertest';
import { User } from '../../models/user';
import { Product } from '../../models/product';

const request = supertest(app);

describe('Test endpoint responses for /products', () => {
  const user: User = {
    first_name: 'Ankita',
    last_name: 'Singh',
    password: 'pass123'
  };

  const product: Product = {
    name: 'Fridge',
    price: 900
  };

  let jwtToken: string;

  beforeAll(async () => {
    const response = await request.post('/users').send(user);
    jwtToken = response.body.token;
  });

  it('should create product', async () => {
    const response = await request
      .post('/products')
      .send(product)
      .set('Authorization', 'bearer ' + jwtToken);
    expect(response.status).toBe(200);
  });

  it('should get products', async () => {
    const response = await request.get('/products').set('Authorization', 'bearer ' + jwtToken);
    expect(response.status).toBe(200);
  });

  it('should get product with ID', async () => {
    const response = await request.get('/products/1').set('Authorization', 'bearer ' + jwtToken);
    expect(response.status).toBe(200);
  });

  it('should update product', async () => {
    const response = await request
      .put('/products/1')
      .send(product)
      .set('Authorization', 'bearer ' + jwtToken);
    expect(response.status).toBe(200);
  });

  it('should not delete product without required token', async () => {
    const response = await request.delete('/products/1');
    expect(response.status).toBe(401);
  });

  it('should delete products with token', async () => {
    const response = await request.delete('/products/1').set('Authorization', 'bearer ' + jwtToken);
    expect(response.status).toBe(200);
  });
});
