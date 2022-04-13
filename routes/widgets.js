/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
///api/widgets
module.exports = (db) => {
  const OrderExist = function (userId) {
    return db.getOrderWithUser(userId).then((order) => {
      if (order) {
        return order;
      }
      return null;
    });
  };

  router.post("/cart", (req, res) => {
    const userId = req.session.userId;
    const meal_id = req.body.id;
    const meal_price = req.body.price;
    OrderExist(userId).then((order) => {
      if (!order) {
        db.createOrder(userId).then((order) => {
          const orderid = order.rows[0].id;
          db.createOrderItem(orderid, meal_id, meal_price).then((orderitem) => {
            console.log("orderitem", orderitem.rows[0]);
            res.send(orderitem.rows[0]);
          });
        });
        return;
      }
      db.createOrderItem(order.id, meal_id, meal_price).then((orderitem) => {
        console.log("orderitem", orderitem.rows[0]);
        res.send(orderitem.rows[0]);
      });
    });
  });
  router.get("/cart", (req, res) => {
    const userId = req.session.userId;
    db.getAllOrderItems(userId).then((items) => {
      db.getUserWithId(userId).then((user) => {
        let total = 0;
        for (const item of items) {
          total += item.price * item.quantity;
        }
        // const total = items.reduce((previousValue, currentValue) => {
        //    previousValue.quantity*previousValue.price + currentValue
        // },0)
        // console.log("total", total);
        console.log("This is the total", total);
        res.render("cart", { items, user, total });
      });
    });
  });

  // delete an order line item
  router.delete("/cart/delete", (req, res) => {
    const userId = req.session.userId;
    const meal_id = req.body.id;
    OrderExist(userId).then((order) => {
      if (!order) {
        //  do delete order
        // db.createOrder(userId).then((order) => {
        //   const orderid = order.rows[0].id;
        //   db.createOrderItem(orderid, meal_id, meal_price).then((orderitem) => {
        //     console.log("orderitem", orderitem.rows[0]);
        //   });
        // });
        // return;
      }
      db.removeOrderItem(meal_id).then((orderitem) => {
        console.log("removed item", orderitem.rows[0]);
        res.send(orderitem.rows[0]);
      });
    });
  });
  return router;
};
