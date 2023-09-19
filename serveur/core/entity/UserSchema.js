const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  postalAdress: {
    type: String,
  },
  role: {
    type: String,
    default: "customer",
  },
  token: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Etudeasy = mongoose.model("user", UserSchema, "user");
