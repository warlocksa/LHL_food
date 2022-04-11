// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);

//helper functions in database
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
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
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
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
