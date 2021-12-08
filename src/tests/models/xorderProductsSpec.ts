import { OrderProductList } from '../../models/order-products';
import { OrderProduct } from '../../models/order-products';

const orderList = new OrderProductList();
let orderProductId: number;

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
  it('create method should add a orderProduct', async () => {
    const orderProductInfo: OrderProduct = {
      order_id: 4,
      product_id: 2,
      quantity: 3
    };
    const result = await orderList.create(orderProductInfo);
    expect(result.order_id).toEqual(4);
    expect(result.product_id).toEqual(2);
    expect(result.quantity).toEqual(3);
    if (result.id) {
      orderProductId = parseInt(result.id.toString());
    }
  });
  it('should return orderProducts list', async () => {
    const result = await orderList.index();
    expect(result.length).toBeGreaterThan(0);
  });
  it('should return orderProducts by orderProducts id', async () => {
    const result = await orderList.show(orderProductId);
    expect(result.id).toBeDefined();
  });
  it('should delete orderProducts by id', async () => {
    await orderList.delete(orderProductId);
    const result = await orderList.show(orderProductId);
    expect(result).toBeFalsy();
  });
});
