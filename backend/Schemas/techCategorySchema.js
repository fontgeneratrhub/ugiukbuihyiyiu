const mongoose = require("mongoose");
// const validator = require("validator");
// const Joi = re quire("joi");

const techCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// <============create collection============>
const TechCategory = new mongoose.model("TechCategory", techCategorySchema);

module.exports = { TechCategory };
