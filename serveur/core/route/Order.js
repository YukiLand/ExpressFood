const express = require("express");
const router = express.Router();
const crypto = require("crypto");
// const generateToken = require("../utils/generateToken");

// Model User
const OrderSchema = require("../entity/OrderSchema");
const MealSchema = require("../entity/MealSchema");
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
        .catch((err) => console.error(err));
      return neworder;
    })
    .catch((err) => console.error(err));
});

// @route POST /order/search
router.post("/search", (req, res) => {
  // if body category is null we return all orders
  if (req.body.customerUUID != null) {
    OrderSchema.find({
      customer_uuid: req.body.customerUUID,
    })
      .then((orders) => {
        if (!orders) {
          return res.status(404).json({ message: "No orders found" });
        }
        return res.status(200).json(orders);
      })
      .catch((err) => console.error(err));
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
      .catch((err) => console.error(err));
  } else if (req.body.category == null) {
    OrderSchema.find()
      .then((orders) => {
        if (!orders) {
          return res.status(404).json({ message: "No orders found" });
        }
        return res.status(200).json(orders);
      })
      .catch((err) => console.error(err));
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
      .catch((err) => console.error(err));
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
      let totalDue = 0;
      let fee = 0;
      console.log("order.meal.length :>> ", order.meal.length);
      for (let i = 0; i < order.meal.length; i++) {
        console.log("i", i);
        let price = order.meal[i].price;
        price = price.substring(0, price.length - 4);
        quantity = order.meal[i].quantity;
        totalDue = totalDue + price * quantity;
      }

      if (totalDue >= 19.99) {
        fee = "Gratuit";
      } else {
        fee = "2.99 EUR";
      }

      if (fee != "Gratuit") {
        fee = 2.99;
        totalDue = totalDue + fee + " EUR";
      } else {
        totalDue = totalDue + " EUR";
      }

      let orderModified = {
        customer_uuid: req.body.customerUUID,
        employee_uuid: req.body.employeeUUID,
        meal: req.body.meal,
        uuid: req.body.uuid,
        status: req.body.status,
        orderDate: req.body.orderDate,
        totalAmount: totalDue,
        deliveryFee: fee,
      };

      if (req.body.status == "paid") {
        // for each different meal in the order we have to substrac the quantity ordered to the quantity available on the meal
        for (let i = 0; i < order.meal.length; i++) {
          // find the meal in the database
          MealSchema.findOne({
            uuid: order.meal[i].uuid,
          })
            .then((meal) => {
              if (!meal) {
                return res.status(200).json({ message: "meal not found" });
              }
              // update the quantity of the meal
              let mealModified = {
                uuid: meal.uuid,
                name: meal.name,
                description: meal.description,
                image: meal.image,
                category: meal.category,
                stockQuantity: meal.stockQuantity - order.meal[i].quantity,
                price: meal.price,
              };
              MealSchema.updateOne({ uuid: meal.uuid }, mealModified)

                .then((meal) => {
                  return res.status(200).json(mealModified);
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        }
      }

      OrderSchema.updateOne({ uuid: order.uuid }, orderModified)
        .then((order) => {
          console.log("order :>> ", order);
          return res.status(200).json(orderModified);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
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
          return res.status(200).json(order);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

module.exports = router;
