const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
var bodyParser = require("body-parser");

const connection = require("./dbConnection");

// require all routes

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const techCategoryRoutes = require("./routes/techCategoryRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const orderRoutes = require("./routes/orderRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

dotenv.config();

// DB-Connection
connection();

const app = express();
// middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors()); //  use  cors to run multiple servers
app.use(express.json()); //  express's body parser to convetert data into JSON form
app.use(bodyParser.json()); // to parse data in json

app.use("/api/user", userRoutes); //user route
app.use("/api/admin", adminRoutes); // Admin route
app.use("/api/category", techCategoryRoutes); // Category route
app.use("/api/technician", technicianRoutes); // Technician route
app.use("/api/order", orderRoutes); // Order route
app.use("/api/feedback", feedbackRoutes); // Feedback route
app.use("/api", checkoutRoutes); //Checkout route

const PORT = process.env.PORT || 4000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

module.exports = app;
