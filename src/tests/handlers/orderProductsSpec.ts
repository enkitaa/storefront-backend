import app from "../../server";
import supertest from "supertest";
import { User } from "../../models/user";
import { Order } from '../../models/order';
import { Product } from '../../models/product';
import { OrderProduct } from '../../models/order-products';

const request = supertest(app);

describe('Tests endpoint responses for /order_products', () => {
  const user: User = {
    first_name: 'Ankita',
    last_name: 'Singh',
    password: 'passwd123'
  };

  const order: Order = {
    status: 'active',
    user_id: 2
  };

  const product: Product = {
    name: "Fridge",
    price: 900,
  };

  const order_product: OrderProduct = {
    order_id: 2,
    product_id: 2,
    quantity: 4
  };

  let jwtToken: string;

  beforeAll(async () => {
    let response = await request.post('/users').send(user);
    jwtToken = response.body.token;
    await request
      .post('/products').send(product).set('Authorization', 'bearer ' + jwtToken)
      .expect(200);

    await request
      .post('/orders').send(order).set('Authorization', 'bearer ' + jwtToken)
      .expect(200);
  });

  it('should create order_product', async () => {
    const response = await request
      .post('/order_products')
      .send(order_product)
      .set('Authorization', 'bearer ' + jwtToken)
      expect(response.status).toBe(200);
  });

  it('should get order_products', async () => {
    const response = await request
      .get('/order_products')
      .set('Authorization', 'bearer ' + jwtToken)
      expect(response.status).toBe(200);
  });

  it('should get order_product with ID', async () => {
    const response = await request
      .get('/order_products/1')
      .set('Authorization', 'bearer ' + jwtToken)
      expect(response.status).toBe(200);
  });

  it('should update order', async () => {
    const response = await request
      .put('/order_products/1')
      .send(order)
      .set('Authorization', 'bearer ' + jwtToken)
      expect(response.status).toBe(200);
  });

  it('should not delete order_product without required token', async () => {
    const response = await request.delete('/order_products/1')
    expect(response.status).toBe(401);
  });

  it('should delete order_product with token', async () => {
    const response = await request
      .delete('/order_products/100')
      .set('Authorization', 'bearer ' + jwtToken)
      expect(response.status).toBe(200);
  });
});
