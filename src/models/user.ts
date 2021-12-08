import client from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltrounds = process.env.SALT_ROUNDS;

export type User = {
  id?: Number;
  first_name: string;
  last_name: string;
  password: string;
};

export class UserList {
  async index(): Promise<User[]> {
    try {
      const con = await client.connect();
      const sql = 'SELECT * from users';
      const result = await con.query(sql);
      con.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users. Error:${err}`);
    }
  }
  async show(id: string): Promise<User[]> {
    try {
      const con = await client.connect();
      const sql = 'SELECT * from users WHERE id=($1)';
      const result = await con.query(sql, [id]);
      con.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get users ${id} Error:${err}`);
    }
  }
  async create(u: User): Promise<User> {
    const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltrounds as string));
    try {
      const sql = 'INSERT INTO users (first_name, last_name, user_password) VALUES($1, $2, $3) RETURNING *';
      const con = await client.connect();
      const result = await con.query(sql, [u.first_name, u.last_name, hash]);
      con.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new user ${u.first_name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
  async update(id: string, user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE users SET first_name = $1, last_name = ($2), user_password = ($3) WHERE id=($4) RETURNING *';
      const result = await conn.query(sql, [user.first_name, user.last_name, user.password, id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${user.id}. Error: ${err}`);
    }
  }
  async authenticate(user: User): Promise<User | null> {
    try {
      const sql = `SELECT * FROM users WHERE first_name = ($1) AND last_name = ($2)`;
      const conn = await client.connect();
      const result = await conn.query(sql, [user.first_name, user.last_name]);
      conn.release();
      if (result.rows.length) {
        const authUser = result.rows[0];
        if (bcrypt.compareSync(user.password + pepper, authUser.user_password)) {
          return authUser;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Could not authenticate user ${user.first_name}. Error: ${err}`);
    }
  }
}
