const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connection = require("./dbConnection.js");

const { Admin } = require("./Schemas/adminSchema.js");
const { User } = require("./Schemas/userSchema.js");
const { TechCategory } = require("./Schemas/techCategorySchema.js");

const admins = require("./data/admins.js");
const users = require("./data/users.js");
const techCategories = require("./data/techCategories.js");

dotenv.config();

connection();

const importData = async () => {
  try {
    await Admin.deleteMany();
    await User.deleteMany();
    await TechCategory.deleteMany();

    await Admin.insertMany(admins);
    await User.insertMany(users);
    await TechCategory.insertMany(techCategories);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Admin.deleteMany();
    await User.deleteMany();
    await Technician.deleteMany();
    await TechCategory.deleteMany();
    await Order.deleteMany();
    await Feedback.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
