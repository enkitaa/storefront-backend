import { OrderProductList } from "../../models/order-products";

const productList = new OrderProductList();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(productList.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(productList.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(productList.create).toBeDefined();
  });
  it('should have a update method', () => {
    expect(productList.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(productList.delete).toBeDefined();
  });

//   it("create method should add a product", async () => {
//     const result = await productList.create({
//       order_id: 1,
//       product_id: 22,
//       quantity: 3,
//     });
//     expect(result).toEqual({
//       order_id: 1,
//       product_id: 22,
//       quantity: 3,
//     });
//   });
});
