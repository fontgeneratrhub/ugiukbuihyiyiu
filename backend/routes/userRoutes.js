const express = require("express");
const router = express.Router();
const connection = require("../dbConnection");
// var bodyParser = require('body-parser')
//  var jsonParser = bodyParser.json()

// const {User} = require("../Schemas/userSchema")

// const {
//   setUser,
//   getUser,
//   logoutUser,
//   changePassword,
// } = require('../controllers/userController');

// require controller
const userController = require("../Controllers/userController");

// require middleware
const authMiddleware = require("../middleware/authMiddleware");
//----------------------------------------------------------------------------

//              User CRUD
//----------------------------------------------------------------------------

// router.get('/users', userController.getUser );0

router.post("/signUp", userController.addUser);

router.post("/login", userController.getUser);

router.get(
  "/showAll/:id",
  authMiddleware.authorizeAdmin,
  userController.getAllUsers
);

router.get("/single/:id", userController.getUserById);

// show user orders
router.get("/userOrders/:id", userController.getUserOrders);

//-----------Insert Data----------------------

// router.use(express.json())
// router.post('/addUser'  , userController.addUser)

// router.post('/loginUser'  , userController.loginUser)

//-----------Update Data----------------------

// router.use(express.json())
router.put("/update/:id", userController.updateUser);

//----------Delete Records -----------------------

router.delete("/delete/:id", userController.deleteUser);

//====================================================

//----------< Authentification> and <Authorization>-------------------------

//     admin     632b3061c48a747227b4a41a

// user     632876fa137b95b9ac2df768

//  router.get('/allUsers/:id', authMiddleware.authenticateUser,
//                               authMiddleware.authorizeUser ,
//                               userController.getUser );

// //----------------------------------------------------------------------------

module.exports = router;
