const mongoose = require("mongoose");
const env = require("dotenv").config();

function connection() {
  try {
    mongoose.connect(process.env.DB),
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        strictQuery: true,
      };
    console.log(" Connection Build");
  } catch (error) {
    console.log("Error: Connection not build");
  }
}
module.exports = connection;
