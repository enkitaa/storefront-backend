import client from '../database';

export type Order = {
  id?: Number;
  status: string;
  user_id: Number;
};

export class OrderList {
  async index(): Promise<Order[]> {
    try {
      const con = await client.connect();
      const sql = 'SELECT * from orders';
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders ${err}`);
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const con = await client.connect();
      const sql = 'SELECT * from orders WHERE id=($1)';
      const result = await con.query(sql, [id]);
      con.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get orders ${id} Error:${err}`);
    }
  }
  async create(o: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      const con = await client.connect();
      const result = await con.query(sql, [o.status, o.user_id]);
      con.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new order for ${o.user_id}. Error: ${err}`);
    }
  }
  async delete(id: number): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async update(id: number, o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE orders SET user_id = ($1), status = ($2) WHERE id=($3) RETURNING *';
      const result = await conn.query(sql, [o.user_id, o.status, id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order ${o.id}. Error: ${err}`);
    }
  }
}
