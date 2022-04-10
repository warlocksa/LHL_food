DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS meals CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_lineitems CASCADE;
DROP TABLE IF EXISTS order_reviews CASCADE;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE meals (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  photo_url VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  cooking_time INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_time DATE NOT NULL,
  user_id INTEGER REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE order_lineitems (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  meal_id INTEGER REFERENCES meals(id) ON DELETE CASCADE,
  price INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE order_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL DEFAULT 0
);