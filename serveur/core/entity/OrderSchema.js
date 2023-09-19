const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer_id: {
    type: String,
  },
  employee_id: {
    type: String,
  },
  meal: {
    type: String,
  },
  orderDate: {
    type: String,
  },
  status: {
    type: String,
  },
});

module.exports = Etudeasy = mongoose.model("order", OrderSchema, "order");
