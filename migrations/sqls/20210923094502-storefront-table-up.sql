CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(100),price integer);
CREATE TABLE users(id SERIAL PRIMARY KEY, first_name varchar, last_name varchar, password varchar);
CREATE TABLE orders(id SERIAL PRIMARY KEY, quantity integer, status varchar,product_id INTEGER,user_id INTEGER,FOREIGN KEY (product_id) REFERENCES products(id),
FOREIGN KEY (user_id) REFERENCES users(id));
