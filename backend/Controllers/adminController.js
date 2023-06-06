const { Admin } = require("../Schemas/adminSchema");

var ObjectId = require("mongodb").ObjectId;

const env = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// import jwt from 'jsonwebtoken'
const connection = require("../dbConnection");
const emailvalidator = require("email-validator");
// var bodyParser = require('body-parser')
//  var jsonParser = bodyParser.json()

module.exports = {
  addAdmin: async (req, res) => {
    try {
      let { name, email, password, confirmPassword, secretCode } = req.body;

      // check all fields are filled or not
      if (!name || !email || !password || !confirmPassword || !secretCode) {
        return res
          .status(400)
          .send({ status: "failed", message: "All fields are Required" });
      } else {
        // Check email formate vaildation
        if (emailvalidator.validate(req.body.email)) {
          // check entered email is sexist in our database or not
          let admin = await Admin.findOne({ email: email });
          if (admin) {
            res
              .status(400)
              .send({ status: "failed", message: "Email already exist" });
            console.log("Email already exist");
          } else {
            // check password and confirm are same Or not
            if (password !== confirmPassword) {
              res
                .status(400)
                .send({ message: "Password must match with Confirm Password" });
            } else {
              if (secretCode == 543210) {
                // encrypt the admin passsword for securituy and save New admin successfully

                const salt = await bcrypt.genSalt(Number(process.env.SALT));
                const hashpswd = await bcrypt.hash(password, salt);
                const newAdmin = new Admin({
                  name: name,
                  email: email,
                  password: hashpswd,
                });
                await newAdmin.save();

                // Generate JWT Token
                const token = jwt.sign(
                  { userID: newAdmin._id },
                  process.env.JWT_SECRET_KEY,
                  { expiresIn: "2d" }
                );

                console.log("Admin Added");
                res.status(200).send({
                  status: "success",
                  message: "Registered Successfully",
                  user: newAdmin,
                  token: token,
                });
              } else {
                res
                  .status(400)
                  .send({ status: "failed", message: "Invalid Secret Code" });
                console.log("Invalid Secret Code");
              }
            }
          }
        } else {
          res.status(400).send({ status: "failed", message: "Invalid Email" });
          console.log("Invalid Email");
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },
  // login
  getAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(email);
      console.log(password);
      //   if (email && password) {

      if (!email || !password) {
        return res
          .status(400)
          .send({ status: "failed", message: "All fields are Required" });
      } else {
        if (emailvalidator.validate(req.body.email)) {
          // let admin = connection();
          let admin = await Admin.findOne({ email: email });
          if (admin != null) {
            const isMatch = await bcrypt.compare(password, admin.password);
            console.log("Password match", isMatch);
            if (admin.email === email && isMatch) {
              // Generate JWT Token
              const token = jwt.sign(
                { adminID: admin._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "2d" }
              );

              res.status(200).send({
                status: "success",
                message: "Login Success",
                token: token,
                user: admin,
              });
            } else {
              res.status(400).send({
                status: "failed",
                message: "Email or password is not Valid",
              });
            }
          } else {
            res.status(400).send({
              status: "failed",
              message: "Email or password is not Valid",
            });
          }
        } else {
          res.status(400).send({ status: "failed", message: "Invalid Email" });
          console.log("Invalid Email");
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },

  updateAdmin: async (req, res) => {
    try {
      const _id = req.params.id;
      console.log(_id);
      // let updateResult = connection();

      let updateResult = await Admin.findByIdAndUpdate(_id, req.body, {
        new: true,
      });

      if (updateResult) {
        res.status(200).send({
          status: "success",
          message: "Admin updated",
          admin: updateResult,
        });
      } else {
        res.status(400).send({ status: "failed", message: "Admin not found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const _id = req.params.id;
      // let deletedResult = connection();
      let deletedResult = await Admin.findByIdAndDelete(_id);
      if (deletedResult) {
        res.status(200).send({
          status: "success",
          message: "Admin deleted",
          admin: deletedResult,
        });
      } else {
        res.status(400).send({ status: "failed", message: "Admin not found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },

  // Logout Admin
  //  logoutAdmin: async (req, res) =>
  //  {
  //      console.log('req.admin: ', req.admin);
  //      const token = req.headers.authorization.split(' ')[1];
  //      console.log(token,'token');

  //      try {
  //      await jwt.destroy(token);
  //      res.status(200).json({ message: 'your are successfully deleted' });
  //      } catch {
  //      res.status(200).json({ message: 'something wrong' });
  //      }
  //  },

  // getAdmin: async(req,res)=>{
  //     try{
  //        let getresult=  connection();
  //           getresult= await Admin.find()
  //         // console.log(getresult);
  //        res.send(getresult)
  //     }catch(e)
  //     {
  //         console.log(e);
  //         res.status(400).send({  "message": "Server Error", "Error": e })
  //     }
  // },

  // getAllAdmins: async(req,res)=>{
  //     try{
  //        let getresult=  connection();
  //           getresult= await Admin.find()
  //         // console.log(getresult);
  //        res.send(getresult)
  //     }catch(e){console.log(e);}
  // },

  // getAdminById:  async(req,res)=>{
  //     try{
  //         const _id = req.params.id;
  //         console.log(_id);
  //         const getIndividualResult = await Admin.findById(_id)
  //         // console.log(getIndividualResult,"admin")
  //         res.status(201).send(getIndividualResult)
  //     }catch(e){res.send(e);}
  // },
};
