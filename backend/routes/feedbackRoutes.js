const express = require("express");
const router = express.Router();

// const {
//   setTechnician,
//   getTechnician,
//   logoutTechnician,
//   changePassword,
// } = require('../controllers/technicianController');

// require controller
const feedbackController = require("../Controllers/feedbackController");

// require middleware
const authMiddleware = require("../middleware/authMiddleware");
//----------------------------------------------------------------------------

//              Technician CRUD
//----------------------------------------------------------------------------

// router.get('/Technicians', technicianController.getTechnician );0
router.post("/add", feedbackController.addFeedback);

router.get(
  "/showAll/:id",
  authMiddleware.authorizeAdmin,
  feedbackController.getAllFeedback
);
// router.get("/single/:id", orderController.getOrderById);

//-----------Update Data----------------------

// router.use(express.json())
router.put("/update/:id", feedbackController.updateFeedback);

//----------Delete Records -----------------------

router.delete("/delete/:id", feedbackController.deleteFeedback);

module.exports = router;
