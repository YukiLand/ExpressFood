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

// @route POST /create
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
        .catch((err) => console.error(err));
      return res.status(200).json(newMeal);
    })
    .catch((err) => console.error(err));
});

// @route POST /meal/search
router.post("/search", (req, res) => {
  // if body category is null we return all meals
  if (req.body.uuid != null) {
    MealEntity.findOne({
      uuid: req.body.uuid,
    })
      .then((meal) => {
        if (!meal) {
          return res.status(404).json({ message: "No meal found" });
        }
        return res.status(200).json(meal);
      })
      .catch((err) => console.error(err));
  } else if (req.body.category == null) {
    MealEntity.find()
      .then((meals) => {
        if (!meals) {
          return res.status(404).json({ message: "No meals found" });
        }
        return res.status(200).json(meals);
      })
      .catch((err) => console.error(err));
  } else {
    MealEntity.find({
      category: req.body.category,
    })
      .then((meals) => {
        if (!meals) {
          return res.status(404).json({ message: "No meals found" });
        }
        return res.status(200).json(meals);
      })
      .catch((err) => console.error(err));
  }
});

// @route POST /users/update
router.post("/update", (req, res) => {
  MealEntity.findOne({
    uuid: req.body.uuid,
  })
    .then((meal) => {
      if (!meal) {
        return res.status(200).json({ message: "Meal not found" });
      }
      let mealModified = {
        uuid: req.body.uuid,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
      };
      MealEntity.updateOne({ uuid: meal.uuid, mealModified })
        .then((meal) => {
          return res.status(200).json(meal);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

// @route DELETE /meals/delete
router.post("/delete", (req, res) => {
  MealEntity.findOne({
    uuid: req.body.uuid,
  })
    .then((meal) => {
      if (!meal) {
        return res.status(200).json({ message: "Meal not found" });
      }
      MealEntity.deleteOne({ uuid: meal.uuid })

        .then((meal) => {
          return res.status(200).json(meal);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

module.exports = router;
