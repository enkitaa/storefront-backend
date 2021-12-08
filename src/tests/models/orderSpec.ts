import { OrderList } from '../../models/order';
import { Order } from '../../models/order';

const order = new OrderList();
let orderId: number;

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(order.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(order.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(order.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(order.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(order.delete).toBeDefined();
  });
  it('should create new order and return it', async () => {
    const orderInfo: Order = {
      status: 'Added',
      user_id: 3
    };
    const result = await order.create(orderInfo);
    expect(result.status).toEqual('Added');
    expect(result.user_id).toEqual(3);
    if (result.id) {
      orderId = parseInt(result.id.toString());
    }
  });
  it('should return orders list', async () => {
    const result = await order.index();
    expect(result.length).toBeGreaterThan(0);
  });
  it('should return orders by order id', async () => {
    const result = await order.show(orderId);
    expect(result.status).toEqual('Added');
    expect(result.user_id).toEqual(3);
  });
  it('should delete orders by id', async () => {
    await order.delete(orderId);
    const result = await order.show(orderId);
    expect(result).toBeFalsy();
    await order.create({
      status: 'To be placed',
      user_id: 3
    });
  });
});
