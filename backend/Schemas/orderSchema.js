const { boolean } = require("joi");
const mongoose = require("mongoose");
// const validator = require("validator");
// const Joi = re quire("joi");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: "Pending",
  },
});

// <============create collection============>
const Order = new mongoose.model("Order", orderSchema);

module.exports = { Order };
