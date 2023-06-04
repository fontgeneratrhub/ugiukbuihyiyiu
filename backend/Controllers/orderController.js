const { Order } = require("../Schemas/orderSchema");
const { User } = require("../Schemas/userSchema");
const { Technician } = require("../Schemas/technicianSchema");
var ObjectId = require("mongodb").ObjectId;

const env = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// import jwt from 'jsonwebtoken'
const connection = require("../dbConnection");

module.exports = {
  addOrder: async (req, res) => {
    try {
      let { userId, technicianId } = req.body;
      console.log(userId, "user id");
      console.log(technicianId, "technician id");
      // check all fields are filled or not
      if (!userId || !technicianId) {
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
          //---------------- check given user is exist or not------------
          let technician = await Technician.findById(technicianId);
          // console.log(getresult);

          if (!technician) {
            res
              .status(400)
              .send({ status: "failed", message: "No Technician found" });
            console.log("Technician not founded");
            // console.log('user founded');
          } else {
            const newOrder = new Order({
              userId: userId,
              technicianId: technicianId,
            });
            await newOrder.save();
            res.status(200).send({
              status: "success",
              message: "Order Added Successfully",
              order: newOrder,
            });
            console.log("Order Added");
          }
        }

        //----------------check given technician is exist or not------------
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },

  // show  all orders
  getAllOrder: async (req, res) => {
    try {
      let order = await Order.find();

      if (order) {
        var orderArr = [];
        for (let i = 0; i < order.length; i++) {
          const userId = order[i].userId;
          const technicianId = order[i].technicianId;
          // console.log("userId", i, userId);
          // console.log("technicianId", i, technicianId);

          let user = await User.findOne({ _id: userId });
          let userName = user.name;
          // console.log(userName);
          let technician = await Technician.findOne({ _id: technicianId });
          let technicianName = technician.name;
          // console.log(technicianName);

          let newObj = {
            _id: order[i]._id,
            userName: userName,
            technicianName: technicianName,
            status: order[i].status,
            createdAt: order[i].createdAt,
          };
          // console.log(newObj);
          orderArr.push(newObj);
          //   let user = await User.findOne
        }

        if (order.length == orderArr.length) {
          res.status(200).send({ status: "success", order: orderArr });
        }
      } else {
        res.status(400).send({ status: "failed", message: "No Order found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
      console.log(e);
    }
  },

  updateOrder: async (req, res) => {
    try {
      const _id = req.params.id;
      console.log(_id);
      // let updateResult = connection();

      let updateResult = await Order.findByIdAndUpdate(_id, req.body, {
        new: true,
      });

      if (updateResult) {
        res.status(200).send({
          status: "success",
          message: "Order updated",
          order: updateResult,
        });
      } else {
        res.status(400).send({ status: "failed", message: "Order not found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const _id = req.params.id;
      // let deletedResult = connection();
      let deletedResult = await Order.findByIdAndDelete(_id);
      if (deletedResult) {
        res.status(200).send({
          status: "success",
          message: "Order deleted",
          order: deletedResult,
        });
      } else {
        res.status(400).send({ status: "failed", message: "Order not found" });
      }
    } catch (e) {
      res.status(404).send(e);
    }
  },
};
