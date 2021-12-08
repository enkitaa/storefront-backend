import app from '../../server';
import supertest from 'supertest';
import { User } from '../../models/user';
import { Order } from '../../models/order';

const request = supertest(app);

describe('Tests endpoint responses for /orders', () => {
  const user: User = {
    first_name: 'Ankita',
    last_name: 'Singh',
    password: 'passwd123'
  };

  const order: Order = {
    status: 'active',
    user_id: 1
  };

  let jwtToken: string;

  beforeAll(async () => {
    const response = await request.post('/users').send(user);
    jwtToken = response.body.token;
  });

  it('should create order', async () => {
    const response = await request
      .post('/orders')
      .send(order)
      .set('Authorization', 'bearer ' + jwtToken);
    expect(response.status).toBe(200);
  });

  it('should get orders', async () => {
    const response = await request.get('/orders').set('Authorization', 'bearer ' + jwtToken);
    expect(response.status).toBe(200);
  });

  it('should get order with ID', async () => {
    const response = await request.get('/orders/1').set('Authorization', 'bearer ' + jwtToken);
    expect(response.status).toBe(200);
  });

  it('should update order', async () => {
    const response = await request
      .put('/orders/1')
      .send(order)
      .set('Authorization', 'bearer ' + jwtToken);
    expect(response.status).toBe(200);
  });

  it('should not delete order without required token', async () => {
    const response = await request.delete('/orders/1');
    expect(response.status).toBe(401);
  });

  it('should delete order with token', async () => {
    const response = await request.delete('/orders/1').set('Authorization', 'bearer ' + jwtToken);
    expect(response.status).toBe(200);
  });
});
