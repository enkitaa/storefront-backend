//@ts-ignore
import client from "../database";

export type Product = {
    id?: Number;
    name: string;
    price: Number;
};

export class ProductList {
    async index(): Promise<Product[]> {
        try {
            //@ts-ignore
            const con = await client.connect();
            const sql = "SELECT * from products";
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }
    async show(id: number): Promise<Product[]> {
        try {
            //@ts-ignore
            const con = await client.connect();
            const sql = "SELECT * from products WHERE user_id=($1)";
            const result = await con.query(sql, [id]);
            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get product ${id} Error:${err}`);
        }
    }
    async create(p: Product): Promise<Product> {
        try {
            const sql =
                "INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";
            //@ts-ignore
            const con = await client.connect();
            const result = await con.query(sql, [p.name, p.price]);
            const product = result.rows[0];
            con.release();
            return product;
        } catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
        }
    }
    async update(id: number, p: Product): Promise<Product> {
        try {
          const conn = await client.connect();
          const sql = 'UPDATE products SET name = ($1), price = ($2) WHERE id=($3) RETURNING *';
          const result = await conn.query(sql, [p.name, p.price, id]);
          conn.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`Could not update product ${p.id}. Error: ${err}`);
        }
      }
    
      async delete(id: number): Promise<Product> {
        try {
          const conn = await client.connect();
          const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
          const result = await conn.query(sql, [id]);
          conn.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
      }  
}