/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  router.get("/", (req, res) => { });

  const login = function (email, password) {
    return db.getUserWithEmail(email).then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  };
  router.get("/staff", (req, res) => {
    const userId = req.session.userId;
    db.getLastOrders().then((o) => {
      const order_id = o.id;
      console.log("order ", order_id);
      db.getOrderItems(order_id).then((items) => {
        db.getPreviousOrders(order_id).then((prevItems) => {
          const result = {};
          const set = new Set();
          for (const prev of prevItems) {
            if (set.has(prev.id)) {
            } else {
              set.add(prev.id);
            }
          }
          for (let i of set) {
            result[i] = [];
          }
          for (const prev of prevItems) {
            result[prev.id].push(prev.name);
          }
          console.log("res", result);
          db.getUserWithId(userId).then((user) => {
            res.render("staff", { items, result, user });
          });
        });
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