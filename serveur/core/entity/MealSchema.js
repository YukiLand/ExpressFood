const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  uuid: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  stockQuantity: {
    type: Number,
  },
  price: {
    type: String,
  },
});

module.exports = Etudeasy = mongoose.model("meal", MealSchema, "meal");
