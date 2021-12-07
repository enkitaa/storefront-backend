import { OrderProductList } from '../../models/order-products';

const orderList = new OrderProductList();

describe('OrderProduct Model', () => {
  it('should have an index method', () => {
    expect(orderList.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orderList.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orderList.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(orderList.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(orderList.delete).toBeDefined();
  });
});
