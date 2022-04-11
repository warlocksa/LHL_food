/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { emailChecker } = require("./helpers");
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");

module.exports = (db) => {
  router.get("/", (req, res) => {
    // db.query(`SELECT * FROM users;`)
    //   .then((data) => {

    //     const users = data.rows;
    //     res.json({ users });
    //   })
    //   .catch((err) => {
    //     res.status(500).json({ error: err.message });
    //   });
  });

  router.post("/login", (req, res) => {
    console.log(req.body);
  });

  router.post("/signup", (req, res) => {
    console.log(req.body);
    // If the e-mail or password are empty strings, send back a response with the 400 status code.
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (email === "" || password === "") {
      res.status(400).send("<h1>email or password is empty<h1>");
      return;
    }
    // If someone tries to register with an email that is already in the users object
    // if (emailChecker(email, users)) {
    //   res.status(400).send("<h1>email already exists<h1>");
    //  return;
    // }
    console.log("firstName", firstName);
    db.query(
      `INSERT INTO customers (first_name,last_name,email,phone,password)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *;
    `,
      [firstName, lastName, email, phone, hashedPassword]
    )
      .then((result) => {
        console.log(result.rows[0]);
        // return result.rows[0];
      })
      .catch((err) => {
        console.log(err);
      });
    //set the user_id key on a session
    // req.session.user_id = id;
    // res.redirect("/");
  });

  return router;
};
// /api/users
