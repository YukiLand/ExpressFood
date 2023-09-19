const express = require("express");
const router = express.Router();
const crypto = require("crypto");
// const generateToken = require("../utils/generateToken");

// Model User
const MealEntity = require("../entity/MealSchema");
// const UsersService = require("../service/UsersService");
// let service = new UsersService();

router.get("/test", (req, res) => {
  res.send("Hello World");
});

// @route POST /signup
router.post("/create", (req, res) => {
  // Check if the user exists
  MealEntity.findOne({
    name: req.body.name,
  })
    .then((meal) => {
      // We are checking if the user exists in the database
      if (meal) {
        return res.status(400).json({ message: "Meal already exists" });
      }
      // Create a new user
      const newMeal = new MealEntity({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        uuid: crypto.randomUUID(),
        price: req.body.price,
      });
      newMeal
        .save()
        .then((meal) => res.json(meal))
        .catch((err) => console.log(err));
      return res.status(200).json({ message: "Meal created" });
    })
    .catch((err) => console.log(err));
});

// @route POST /users/get
router.post("/get", (req, res) => {
  // Check if the user exists
  MealEntity.findOne({
    token: req.body.token,
  })
    .then((user) => {
      if (!user) {
        // if the user with this token does not exist in the database we return an error
        return res.status(200).json({ tokennotfound: "Token not found" });
      }
      // else we return the user
      let usrModified = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
      };
      return res.status(200).json(usrModified);
    })
    .catch((err) => console.log(err));
});

// @route POST /users/update
router.post("/update", (req, res) => {
  MealEntity.findOne({
    uuid: req.body.uuid,
  })
    .then((user) => {
      if (!user) {
        return res.status(200).json({ tokennotfound: "User not found" });
      }
      switch (req.body.field) {
        case "email":
          console.log("user._id :>> ", user._id);
          MealEntity.updateOne({ _id: user._id }, { email: req.body.value })
            .then((user) => {
              console.log("user updated");
              return res.status(200).json(user);
            })
            .catch((err) => console.log(err));

          break;
        case "password":
          MealEntity.updateOne({ _id: user._id }, { password: req.body.value })
            .then((user) => {
              console.log("user updated");
              return res.status(200).json(user);
            })
            .catch((err) => console.log(err));
        default:
          break;
      }
    })
    .catch((err) => console.log(err));
});

// @route DELETE /users/delete
router.post("/delete", (req, res) => {
  MealEntity.findOne({
    token: req.body.token,
  })
    .then((user) => {
      if (!user) {
        return res.status(200).json({ tokennotfound: "User not found" });
      }
      MealEntity.deleteOne({ _id: user._id })

        .then((user) => {
          console.log("user deleted");
          return res.status(200).json(user);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
