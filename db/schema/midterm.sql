DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS meals CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_lineitems CASCADE;
DROP TABLE IF EXISTS order_reviews CASCADE;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
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
  order_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE order_lineitems (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  meal_id INTEGER REFERENCES meals(id) ON DELETE CASCADE,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE order_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL DEFAULT 0
);



-- select meals.photo_url,order_lineitems.price, order_lineitems.quantity
-- from orders join order_lineitems
-- on orders.id = order_lineitems.order_id
-- join meals on order_lineitems.meal_id = meals.id
-- where orders.user_id = 4
-- group by orders.id, order_lineitems.id,meals.id;


-- select meals.photo_url,meals.name,order_lineitems.id,order_lineitems.price, order_lineitems.quantity,
-- sum(order_lineitems.price*order_lineitems.quantity)
-- from order_lineitems join orders on order_lineitems.order_id = orders.id
-- join meals on order_lineitems.meal_id = meals.id
-- where user_id= 3
-- group by orders.id,meals.id, order_lineitems.id;


-- select sum(order_lineitems.price * order_lineitems.quantity) AS total
-- from orders join order_lineitems
-- on orders.id = order_lineitems.order_id
-- where orders.user_id = 3
-- group by orders.id
