const { string } = require("joi");
const mongoose = require("mongoose");
// const validator = require("validator");
// const Joi = re quire("joi");

const technicianSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      // required: true
    },
    category: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      title: {
        type: String,
        required: true,
      },
    },
    cnic: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    subscription: {
      type: {
        type: String, // monthly? year?none
        default: "none",
      },
      subscribed: {
        type: Boolean,
        default: false,
      },
      payment: {
        type: String,
        // required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// <============create collection============>
const Technician = new mongoose.model("Technician", technicianSchema);

// const validate = (data) => {
//     const schema = Joi.object({
//         name: Joi.string().required().min(3).label("Name"),
//         email: Joi.string().email().required().label("Email address"),
//         pswd: Joi.string().password().required().min(6).label("Password"),
//         phone: Joi.string().required().label("Phone"),
//         gender: Joi.string().required().label("Gender"),

//     });
//     return schema.validate(data);
// };

module.exports = { Technician };
