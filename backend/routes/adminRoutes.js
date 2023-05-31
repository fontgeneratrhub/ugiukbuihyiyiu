const express = require("express");
const router = express.Router();
const connection = require("../dbConnection");
const Admin = require("../Schemas/adminSchema");

// const {
//   setAdmin,
//   getAdmin,
//   logoutAdmin,
//   changePassword,
// } = require('../controllers/AdminController');

// require controller
const adminController = require("../Controllers/adminController");

// require middleware
const authMiddleware = require("../middleware/authMiddleware");

//----------------------------------------------------------------------------
// //             admin CRUD
// //----------------------------------------------------------------------------

//-----------------Get Data---------------

// router.get('/admins', adminController.getadmin )

router.post("/signUp", adminController.addAdmin);

router.post("/login", adminController.getAdmin);

//-----------Update Data----------------------

router.put("/update/:id", adminController.updateAdmin);

//----------Delete Records -----------------------

router.delete("/delete/:id", adminController.deleteAdmin);

//----------< Authentification> and <Authorization>-------------------------

//     admin     632b3061c48a747227b4a41a

// admin     632876fa137b95b9ac2df768

// router.get('/alladmins/:id',authMiddleware.authenticateadmin,
//                             authMiddleware.authorizeAdmin ,
//                             adminController.getadmin );

//======================================EEEENNNNDDDD===========================================================

module.exports = router;
