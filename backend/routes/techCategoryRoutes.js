const express = require("express");
const router = express.Router();
const connection = require("../dbConnection");
const TechCategory = require("../Schemas/techCategorySchema");

// const {
//   setAdmin,
//   getAdmin,
//   logoutAdmin,
//   changePassword,
// } = require('../controllers/AdminController');

// require controller
const techCategoryController = require("../Controllers/techCategoryController");

// require middleware
const authMiddleware = require("../middleware/authMiddleware");

//-------- Routes--------------

router.post(
  "/addCategory/:id",
  authMiddleware.authorizeAdmin,
  techCategoryController.addCategory
);

//-----------Read Data----------------------

router.get("/showAll", techCategoryController.getCategory);

//-----------Update Data----------------------

// 'id' for admin id for authorization
// 'cid' for Category id for update category
router.put(
  "/update/:id/:cid",
  authMiddleware.authorizeAdmin,
  techCategoryController.updateCategory
);

//----------Delete Records -----------------------

// 'id' for admin id for authorization
// 'cid' for Category id for update category
router.delete(
  "/delete/:id/:cid",
  authMiddleware.authorizeAdmin,
  techCategoryController.deleteCategory
);

//----------< Authentification> and <Authorization>-------------------------

//     admin     632b3061c48a747227b4a41a

// admin     632876fa137b95b9ac2df768

// router.get('/alladmins/:id',authMiddleware.authenticateadmin,
//                             authMiddleware.authorizeAdmin ,
//                             adminController.getadmin );

//======================================EEEENNNNDDDD===========================================================

module.exports = router;
