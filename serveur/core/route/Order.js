const express = require("express");
const router = express.Router();
const crypto = require("crypto");
// const generateToken = require("../utils/generateToken");

// Model User
const OrderSchema = require("../entity/OrderSchema");
// const UsersService = require("../service/UsersService");
// let service = new UsersService();

router.get("/test", (req, res) => {
  res.send("Hello World");
});

// @route POST /create
router.post("/create", (req, res) => {
  // Check if the user exists
  OrderSchema.findOne({
    customer_uuid: req.body.customerUUID,
  })
    .then((order) => {
      // We are checking if the user exists in the database
      if (order) {
        return res.status(400).json({ message: "order already exists" });
      }
      // Create a new user
      const neworder = new OrderSchema({
        customer_uuid: req.body.customerUUID,
        meal: req.body.meal,
        uuid: crypto.randomUUID(),
      });
      neworder
        .save()
        .then((order) => res.json(order))
        .catch((err) => console.log(err));
      return neworder;
    })
    .catch((err) => console.log(err));
});

// @route POST /order/search
router.post("/search", (req, res) => {
  // if body category is null we return all orders
  if (req.body.category == null) {
    OrderSchema.find()
      .then((orders) => {
        if (!orders) {
          return res.status(404).json({ message: "No orders found" });
        }
        return res.status(200).json(orders);
      })
      .catch((err) => console.log(err));
  } else if (req.body.uuid != null) {
    OrderSchema.findOne({
      uuid: req.body.uuid,
    })
      .then((order) => {
        if (!order) {
          return res.status(404).json({ message: "No order found" });
        }
        return res.status(200).json(order);
      })
      .catch((err) => console.log(err));
  } else {
    OrderSchema.find({
      category: req.body.category,
    })
      .then((orders) => {
        if (!orders) {
          return res.status(404).json({ message: "No orders found" });
        }
        return res.status(200).json(orders);
      })
      .catch((err) => console.log(err));
  }
});

// @route POST /users/update
router.post("/update", (req, res) => {
  OrderSchema.findOne({
    uuid: req.body.uuid,
  })
    .then((order) => {
      if (!order) {
        return res.status(200).json({ message: "order not found" });
      }

      console.log("order :>> ", order);
      let orderModified = {
        customer_uuid: req.body.customerUUID,
        employee_uuid: req.body.employeeUUID,
        meal: req.body.meal,
        uuid: req.body.uuid,
        status: req.body.status,
        orderDate: req.body.orderDate,
      };

      console.log("orderModified :>> ", orderModified);

      OrderSchema.updateOne({ uuid: order.uuid }, orderModified)
        .then((order) => {
          console.log("order updated");
          return res.status(200).json(order);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// @route DELETE /orders/delete
router.post("/delete", (req, res) => {
  OrderSchema.findOne({
    uuid: req.body.uuid,
  })
    .then((order) => {
      if (!order) {
        return res.status(200).json({ message: "order not found" });
      }
      OrderSchema.deleteOne({ uuid: order.uuid })

        .then((order) => {
          console.log("order deleted");
          return res.status(200).json(order);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
