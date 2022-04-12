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
      if (orders.length < 1) {
        return null;
      }
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
      if (userset.length < 1) {
        return null;
      }
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
      if (userset.length < 1) {
        return null;
      }
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
      console.log("result".result);
      if (result) {
        console.log("result".result);
        return result;
      }
    })
    .catch((err) => {
      console.log("error when inserting into orderline items", err);
    });
};
exports.createOrderItem = createOrderItem;

//Get all order items with userid
const getAllOrderItems = function (id) {
  return db
    .query(
      `
      select meals.photo_url,meals.name,order_lineitems.price, order_lineitems.quantity
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
      if (itemset.length < 1) {
        return null;
      }
      console.log("allorderitems", itemset);
      return itemset;
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getAllOrderItems = getAllOrderItems;
