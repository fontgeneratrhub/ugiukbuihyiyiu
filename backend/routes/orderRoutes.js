const express = require("express");
const router = express.Router();

// const {
//   setTechnician,
//   getTechnician,
//   logoutTechnician,
//   changePassword,
// } = require('../controllers/technicianController');

// require controller
const orderController = require("../Controllers/orderController");

// require middleware
const authMiddleware = require("../middleware/authMiddleware");
//----------------------------------------------------------------------------

//              Technician CRUD
//----------------------------------------------------------------------------

// router.get('/Technicians', technicianController.getTechnician );0
router.post("/book", orderController.addOrder);

router.get(
  "/showAll/:id",
  authMiddleware.authorizeAdmin,
  orderController.getAllOrder
);
// router.get("/single/:id", orderController.getOrderById);

//-----------Update Data----------------------

// router.use(express.json())
router.put("/update/:id", orderController.updateOrder);

//----------Delete Records -----------------------

router.delete("/delete/:id", orderController.deleteOrder);

module.exports = router;
