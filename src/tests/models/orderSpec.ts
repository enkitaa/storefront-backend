import { OrderList } from '../../models/order';

const order = new OrderList();

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
});
