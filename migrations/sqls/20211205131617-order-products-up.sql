CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  status VARCHAR,
  user_id integer REFERENCES users(id) NOT NULL
);