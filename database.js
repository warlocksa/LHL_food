// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);

//helper functions in database

/**
 * Get a order from the database given user id.
 */

const getOrderWithUser = function (user_id) {
  return db
    .query(
      `SELECT * FROM orders
       WHERE user_id = $1
      `,
      [user_id]
    )
    .then((result) => {
      const orders = result.rows;
      return orders[0];
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getOrderWithUser = getOrderWithUser;

/**
 * Get a single user from the database given their email.
 */

const getUserWithEmail = function (email) {
  return db
    .query(
      `SELECT * FROM customers
       WHERE email = $1
      `,
      [email]
    )
    .then((result) => {
      const userset = result.rows;
      return userset[0];
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 */
const getUserWithId = function (id) {
  return db
    .query(
      `SELECT * FROM customers
     WHERE id = $1
    `,
      [id]
    )
    .then((result) => {
      const userset = result.rows;
      return userset[0];
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getUserWithId = getUserWithId;

// add a customer to database
const addUser = function (user) {
  return db
    .query(
      `INSERT INTO customers (first_name,last_name,email,phone,password)
  VALUES($1,$2,$3,$4,$5)
  RETURNING *;
  `,
      [user.firstname, user.lastname, user.email, user.phone, user.password]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.addUser = addUser;

/// meals

/**
 * Get all meals.
 */
const getAllMeals = function () {
  return db
    .query(
      ` SELECT *
      FROM meals;`
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAllMeals = getAllMeals;

/**
 * Create an order
 */
const createOrder = function (user_id) {
  return db
    .query(
      `INSERT INTO orders (user_id)
  VALUES($1)
  RETURNING *;
  `,
      [user_id]
    )
    .then((result) => {
      console.log("order created");
      if (result) {
        return result;
      }
    })
    .catch((err) => {
      console.log("error when inserting into order", err);
    });
};
exports.createOrder = createOrder;

/**
 * Create a orderline itme
 */
const createOrderItem = function (order_id, meal_id, meal_price) {
  return db
    .query(
      `INSERT INTO order_lineitems (order_id, meal_id,price)
  VALUES($1,$2,$3)
  RETURNING *;
  `,
      [order_id, meal_id, meal_price]
    )
    .then((result) => {
      console.log("result", result);
      if (result) {
        console.log("result", result);
        return result;
      }
    })
    .catch((err) => {
      console.log("error when inserting into orderline items", err);
    });
};
exports.createOrderItem = createOrderItem;

//Get all order line items with userid
const getAllOrderItems = function (id) {
  return db
    .query(
      `
      select meals.photo_url,meals.name, order_lineitems.id, order_lineitems.price, order_lineitems.quantity,sum(order_lineitems.price * order_lineitems.quantity) AS total
from orders join order_lineitems
on orders.id = order_lineitems.order_id
join meals on order_lineitems.meal_id = meals.id
where orders.user_id = $1
group by orders.id, order_lineitems.id,meals.id;
    `,
      [id]
    )
    .then((result) => {
      const itemset = result.rows;
      console.log("allorderitems", itemset);
      return itemset;
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAllOrderItems = getAllOrderItems;

//Remove an order line item

const removeOrderItem = function (item_id) {
  return db
    .query(
      `DELETE FROM order_lineitems WHERE id = $1;
  `,
      [item_id]
    )
    .then((result) => {
      console.log("delete", result);
      if (result) {
        console.log("delete2", result);
        console.log("item_id", item_id);
        return result;
      }
    })
    .catch((err) => {
      console.log("error when deleting orderline items", err);
    });
};
exports.removeOrderItem = removeOrderItem;

//get last order
const getLastOrders = function () {
  return db
    .query(
      `SELECT * FROM orders
      ORDER BY order_time DESC
      LIMIT 1;
      `
    )
    .then((result) => {
      const orders = result.rows[0];
      return orders;
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getLastOrders = getLastOrders;

//get order items with order id
const getOrderItems = function (id) {
  return db
    .query(
      `SELECT * FROM order_lineitems
      JOIN meals ON meals.id = order_lineitems.meal_id
      WHERE order_id = $1;
      `,
      [id]
    )
    .then((result) => {
      const orders = result.rows;
      return orders;
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getOrderItems = getOrderItems;

// select * from order_lineitems
// where order_id in (select orders.id
//   from order_lineitems join orders
//   on orders.id = order_lineitems.order_id
//   group by orders.id);



