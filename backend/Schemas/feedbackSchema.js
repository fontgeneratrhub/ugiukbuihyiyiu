// const { boolean } = require("joi");
const mongoose = require("mongoose");
// const validator = require("validator");
// const Joi = re quire("joi");

const feedbackSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  description: {
    type: String,
    require: true,
  },
  stars: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// <============create collection============>
const Feedback = new mongoose.model("Feedback", feedbackSchema);

module.exports = { Feedback };
