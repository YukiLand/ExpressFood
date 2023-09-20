const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer_uuid: {
    type: String,
  },
  employee_uuid: {
    type: String,
  },
  meal: {
    type: Array,
  },
  orderDate: {
    type: String,
  },
  creationDate: {
    type: String,
    default: Date.now,
  },
  uuid: {
    type: String,
  },
  totalAmount: {
    type: String,
  },
  deliveryFee: {
    type: String,
  },
  status: {
    type: String,
    default: "creationInProgress",
  },
});

module.exports = Etudeasy = mongoose.model("order", OrderSchema, "order");
