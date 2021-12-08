import { ProductList } from '../../models/product';
import { Product } from '../../models/product';

const productList = new ProductList();
let productId: number;

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(productList.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(productList.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(productList.create).toBeDefined();
  });
  it('should have a update method', () => {
    expect(productList.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(productList.delete).toBeDefined();
  });

  it('create method should add a product', async () => {
    const productInfo: Product = {
      name: 'Soap',
      price: 5
    };
    const result = await productList.create(productInfo);
    expect(result.name).toEqual('Soap');
    expect(result.price).toEqual(5);
    if (result.id) {
      productId = parseInt(result.id.toString());
    }
  });
  it('should return products list', async () => {
    const result = await productList.index();
    expect(result.length).toBeGreaterThan(0);
  });
  it('should return products by products id', async () => {
    const result = await productList.show(productId);
    expect(result.name).toBe('Soap');
    expect(result.price).toBe(5);
  });
  it('should delete products by id', async () => {
    productList.delete(productId);
    const result = await productList.show(productId);
    expect(result).toBeFalsy();
  });
});
