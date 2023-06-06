const express = require("express");
// const connection =require("./dbConnection");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connection = require("./dbConnection");
var bodyParser = require("body-parser");

//---------------Controllers-----------------------

// const userController = require("./Controllers/userController");
// const postController = require("./Controllers/postController");

// require all routes

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const techCategoryRoutes = require("./routes/techCategoryRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const orderRoutes = require("./routes/orderRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

// DB-Connection
connection();

// middlewares

//  use  cors to run multiple servers
app.use(cors());

//  express's body parser to convetert data into JSON form
app.use(express.json());
// to parse data in json
app.use(bodyParser.json());
// var jsonParser = bodyParser.json()

app.get("/", (req, res) => {
  res.send("API is running...");
});

//user route
app.use("/api/user", userRoutes);

// Admin route
app.use("/api/admin", adminRoutes);

// Category route
app.use("/api/category", techCategoryRoutes);

// Technician route
app.use("/api/technician", technicianRoutes);

// Order route
app.use("/api/order", orderRoutes);

// Feedback route
app.use("/api/feedback", feedbackRoutes);

//Checkout route
app.use("/api", checkoutRoutes);

const PORT = process.env.PORT || 4000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//  userController.getAllUser );

// -----------for validation---------------

// ,  async (req, res, next) => {

//   const required = [
//       "Name",
//       "Email",
//       "Phone",
//       "Address",

//   ]

//   const userErrors = {}

//   for (const key of required) {

//       const val = req.body[key]

//       if (!val) {
//           userErrors[key] = `${key} is required`
//       }
//   }

//   // if (!cust_id) {
//   //     errors["cust_id"] = "cust_id is required"
//   // }

//   // if (!product_id) {
//   //     errors["product_id"] = "product_id is required"
//   // }

//   // if (!orders_descrip) {
//   //     errors["orders_descrip"] = "orders_descrip is required"
//   // }

//   // if (!orders_totalprice) {
//   //     errors["orders_totalprice"] = "orders_totalprice is required"
//   // }

//   // if (!orders_reviews) {
//   //     errors["orders_reviews"] = "orders_reviews is required"
//   // }

//   console.log("*** User Errors ***\n", Object.keys(userErrors))

//   if (Object.keys(userErrors).length > 0) {
//       return res.status(400).json({
//           message: "Data validation failed",
//           errors: userErrors
//       })
//   }

//   next()

// }
