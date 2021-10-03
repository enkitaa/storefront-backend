// @ts-ignore
import client from "../database";

export type Order = {
    id: Number;
    quantity: Number;
    status: string;
    product_id: Number;
    user_id: Number;
};

export class OrderList {
    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            const con = await client.connect();
            const sql = "SELECT * from orders";
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders ${err}`);
        }
    }
    async show(id: number): Promise<Order[]> {
        try {
            // @ts-ignore
            const con = await client.connect();
            const sql = "SELECT * from orders WHERE id=($1)";
            const result = await con.query(sql, [id]);
            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get orders ${id} Error:${err}`);
        }
    }
    async create(o: Order): Promise<Order> {
        try {
            const sql =
                "INSERT INTO orders (quantity, status, product_id, user_id) VALUES($1, $2, $3, $4) RETURNING *";
            // @ts-ignore
            const con = await client.connect();
            const result = await con.query(sql, [
                o.quantity,
                o.status,
                o.product_id,
                o.user_id,
            ]);
            const order = result.rows[0];
            con.release();
            return order;
        } catch (err) {
            throw new Error(`Could not add new order ${o.product_id}. Error: ${err}`);
        }
    }
    async delete(id: number): Promise<Order> {
        try {
            const sql = "DELETE FROM orders WHERE id=($1)";
            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
