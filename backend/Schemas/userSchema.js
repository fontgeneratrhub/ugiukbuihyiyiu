const mongoose = require("mongoose");
// const validator = require("validator");
// const Joi = re quire("joi");

const userSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

// <============create collection============>
const User = new mongoose.model("User", userSchema);

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

module.exports = { User };
