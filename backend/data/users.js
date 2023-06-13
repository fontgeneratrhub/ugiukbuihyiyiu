const bcrypt = require("bcrypt");

const users = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "John Smith",
    email: "johnsmith@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
