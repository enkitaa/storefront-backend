//@ts-ignore
import client from "../database";
import bcrypt, { hash } from 'bcrypt';

const pepper = process.env.BCYPT_PASSWORD;
const saltrounds = process.env.SALT_ROUNDS;

export type User = {
    id: Number;
    first_name: string;
    last_name: string;
    password: string;
};

export class UserList {
    async index(): Promise<User[]> {
        try {
            //@ts-ignore
            const con = await client.connect();
            const sql = "SELECT * from users";
            const result = await con.query(sql);
            con.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users. Error:${err}`);
        }
    }
    async show(id: number): Promise<User[]> {
        try {
            //@ts-ignore
            const con = await client.connect();
            const sql = "SELECT * from users WHERE id=($1)";
            const result = await con.query(sql, [id]);
            con.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get users ${id} Error:${err}`);
        }
    }
    async create(u: User): Promise<User> {
        let hash = bcrypt.hashSync(u.password + pepper, Number(saltrounds))
        try {
            const sql =
                "INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *";
            //@ts-ignore
            const con = await client.connect();

            const result = await con.query(sql, [
                u.first_name,
                u.last_name,
                u.password,
                hash
            ]);

            const user = result.rows[0];

            con.release();

            return user;
        } catch (err) {
            throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const sql = "DELETE FROM users WHERE id=($1)";
            //@ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
}
