const { Feedback } = require("../Schemas/feedbackSchema");
const { User } = require("../Schemas/userSchema");
const { Technician } = require("../Schemas/technicianSchema");
var ObjectId = require("mongodb").ObjectId;

const env = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// import jwt from 'jsonwebtoken'
const connection = require("../dbConnection");

module.exports = {
  addFeedback: async (req, res) => {
    try {
      let { userId, technicianId, description, stars } = req.body;
      console.log(userId, "user id");
      console.log(technicianId, "technician id");
      // check all fields are filled or not
      if (!userId || !technicianId || !description || !stars) {
        return res
          .status(400)
          .send({ status: "failed", message: "All fields are Required" });
      } else {
        //---------------- check given user is exist or not------------

        let user = await User.findById(userId);
        // console.log(getresult);

        //---------------- check given user is exist or not------------
        if (!user) {
          res.status(400).send({ status: "failed", message: "No User found" });
          console.log("user not founded");
          // console.log('user founded');
        } else {
          //----------------check given technician is exist or not------------
          let technician = await Technician.findById(technicianId);
          // console.log(getresult);

          if (!technician) {
            res
              .status(400)
              .send({ status: "failed", message: "No Technician found" });
            console.log("Technician not founded");
            // console.log('user founded');
          } else {
            if (stars <= 0 || stars > 5) {
              res.status(400).send({
                status: "failed",
                message: "Rate Technician by giving start from ! to 5",
              });
              console.log("Invalid Stars Input");
            } else {
              const newFeedback = new Feedback({
                userId: userId,
                technicianId: technicianId,
                description: description,
                stars: stars,
              });
              await newFeedback.save();
              res.status(200).send({
                status: "success",
                message: "Feedback Added Successfully",
                feedback: newFeedback,
              });
              console.log("Feedback Added");
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },

  // show  all Feedbacks
  getAllFeedback: async (req, res) => {
    try {
      let feedback = await Feedback.find();

      if (feedback) {
        var feedbackArr = [];
        for (let i = 0; i < feedback.length; i++) {
          const userId = feedback[i].userId;
          const technicianId = feedback[i].technicianId;
          // console.log("userId", i, userId);
          // console.log("technicianId", i, technicianId);

          let user = await User.findOne({ _id: userId });
          let userName = user.name;
          // console.log(userName);
          let technician = await Technician.findOne({ _id: technicianId });
          let technicianName = technician.name;
          // console.log(technicianName);

          let newObj = {
            _id: feedback[i]._id,
            userName: userName,
            technicianName: technicianName,
            description: feedback[i].description,
            stars: feedback[i].stars,
            createdAt: feedback[i].createdAt,
          };
          // console.log(newObj);
          feedbackArr.push(newObj);
          //   let user = await User.findOne
        }

        if (feedback.length == feedbackArr.length) {
          res.status(200).send({ status: "success", feedback: feedbackArr });
        }
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "No Feedback found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
      console.log(e);
    }
  },

  updateFeedback: async (req, res) => {
    try {
      const _id = req.params.id;
      console.log(_id);
      // let updateResult = connection();

      let updateResult = await Feedback.findByIdAndUpdate(_id, req.body, {
        new: true,
      });

      if (updateResult) {
        res.status(200).send({
          status: "success",
          message: "Feedback updated",
          feedback: updateResult,
        });
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "Feedback not found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },

  deleteFeedback: async (req, res) => {
    try {
      const _id = req.params.id;
      // let deletedResult = connection();
      let deletedResult = await Feedback.findByIdAndDelete(_id);
      if (deletedResult) {
        res.status(200).send({
          status: "success",
          message: "Feedback deleted",
          feedback: deletedResult,
        });
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "Feedback not found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },
};
