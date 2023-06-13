const bcrypt = require("bcrypt");

const admins = [
  {
    name: "Super Admin",
    email: "super-admin@kariger.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Admin",
    email: "admin@kariger.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = admins;
