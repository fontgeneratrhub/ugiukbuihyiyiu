const mongoose = require("mongoose");

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
      type: Boolean,
      default: false,
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

module.exports = { Technician };
