/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  router.get("/", (req, res) => {});

  const login = function (email, password) {
    return db.getUserWithEmail(email).then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  };
  router.get("/staff", (req, res) => {
    db.getLastOrders().then((o) => {
      const meal_id = o.id;
      console.log("meal_id ", meal_id);
      db.getOrderItems(meal_id).then((items) => {
        console.log("items", items);
        res.render("staff", { items });
      });
    });
  });
  router.post("/login", (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    login(email, password)
      .then((user) => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        console.log("log in user", user);
        req.session.userId = user.id;
        if (email === "xinwang213z@gmail.com") {
          res.redirect("/api/users/staff");
          return;
        }
        res.redirect("/");
      })
      .catch((e) => res.send(e));
  });

  router.post("/signup", (req, res) => {
    const user = req.body;
    console.log("user", user);
    user.password = bcrypt.hashSync(user.password, 10);
    db.addUser(user)
      .then((user) => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        console.log("sign up user", user);
        req.session.userId = user.id;
        res.redirect("/");
      })
      .catch((e) => res.send(e));
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};