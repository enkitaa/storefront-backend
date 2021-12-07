import client from "../database";

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderProductList {
  async index(): Promise<OrderProduct[]> {
    try {
      const sql = "SELECT * FROM order_products";
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get ordered products. Error: ${err}`);
    }
  }
  async show(id: number): Promise<OrderProduct> {
    try {
      const sql = "SELECT * FROM order_products WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find ordered product with id ${id}. Error: ${err}`
      );
    }
  }
  async create(order: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        order.order_id,
        order.product_id,
        order.quantity,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add order ${order.order_id} for product ${order.product_id}. Error: ${err}`
      );
    }
  }
  async delete(id: number): Promise<OrderProduct> {
    try {
      const sql = "DELETE FROM order_products WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete ordered product ${id}. Error: ${err}`);
    }
  }

  async update(id: number, o: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE order_products SET order_id = ($1), product_id = ($2), quantity = ($3) WHERE id=($4) RETURNING *";
      const result = await conn.query(sql, [
        o.order_id,
        o.product_id,
        o.quantity,
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update order product ${o.order_id}. Error: ${err}`
      );
    }
  }
}