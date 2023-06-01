const { Technician } = require("../Schemas/technicianSchema");
const { TechCategory } = require("../Schemas/techCategorySchema");

var ObjectId = require("mongodb").ObjectId;

const env = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// import jwt from 'jsonwebtoken'
const connection = require("../dbConnection");
const emailvalidator = require("email-validator");

module.exports = {
  addTechnician: async (req, res) => {
    try {
      const regPhone = /^\+?[1-9][0-9]{11,14}$/;
      const regCnic = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
      //   const id = req.params.cid;
      //   console.log(id, "cid");

      let {
        categoryId,
        name,
        email,
        password,
        confirmPassword,
        location,
        experience,
        phone,
        cnic,
        address,
      } = req.body;

      // let category = connection();
      let category = await TechCategory.findById(categoryId);
      console.log(category.title, "cat-name");
      // let technician = connection();

      // check all fields are filled or not
      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword ||
        !cnic ||
        !location ||
        !experience ||
        !phone ||
        !address ||
        !categoryId
      ) {
        return res
          .status(400)
          .send({ status: "failed", message: "All fields are Required" });
      } else {
        // Check email formate vaildation
        if (emailvalidator.validate(req.body.email)) {
          // check entered email is sexist in our database or not
          // let technician = connection();
          let technician = await Technician.findOne({ email: email });
          if (technician) {
            res
              .status(400)
              .send({ status: "failed", message: "Email already exist" });
            console.log("Email already exist");
          } else {
            // check password and confirm are same Or not
            if (password !== confirmPassword) {
              res.status(400).send({
                status: "failed",
                message: "Password must match with Confirm Password",
              });
            } else {
              if (!regPhone.test(phone)) {
                res.status(400).send({
                  status: "failed",
                  message: "Enter phone Number in correct formate",
                });
              } else {
                if (!regCnic.test(cnic)) {
                  res.status(400).send({
                    status: "failed",
                    message: "CNIC No must follow the XXXXX-XXXXXXX-X format!",
                  });
                } else {
                  // encrypt the technician passsword for securituy and save New technician successfully

                  const salt = await bcrypt.genSalt(Number(process.env.SALT));
                  const hashpswd = await bcrypt.hash(password, salt);
                  const newTechnician = new Technician({
                    name: name,
                    email: email,
                    password: hashpswd,
                    category: { _id: categoryId, title: category.title },
                    cnic: cnic,
                    location: location,
                    experience: experience,
                    phone: phone,
                    address: address,
                  });
                  await newTechnician.save();
                  console.log("Technician Added");

                  // Generate JWT Token
                  const token = jwt.sign(
                    { technicianID: newTechnician._id },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "2d" }
                  );

                  res.status(200).send({
                    status: "success",
                    message: "Registered Successfully",
                    token: token,
                    user: newTechnician,
                  });
                }
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
  getTechnician: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(email);
      console.log(password);
      //   if (email && password) {

      if (!email || !password) {
        return res
          .status(400)
          .json({ status: "failed", message: "All fields are Required" });
      } else {
        if (emailvalidator.validate(req.body.email)) {
          // let technician = connection();
          let technician = await Technician.findOne({ email: email });
          if (technician != null) {
            const isMatch = await bcrypt.compare(password, technician.password);
            console.log("Password match", isMatch);
            if (technician.email === email && isMatch) {
              // Generate JWT Token
              const token = jwt.sign(
                { technicianID: technician._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "2d" }
              );

              res.status(200).send({
                status: "success",
                message: "Login Success",
                token: token,
                user: technician,
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

  updateTechnician: async (req, res) => {
    try {
      const _id = req.params.id;
      console.log(_id);
      // let updateResult = connection();

      let updateResult = await Technician.findByIdAndUpdate(_id, req.body, {
        new: true,
      });

      if (updateResult) {
        res.status(200).send({
          status: "success",
          message: "Technician updated",
          technician: updateResult,
        });
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "Technician not found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },

  deleteTechnician: async (req, res) => {
    try {
      const _id = req.params.id;
      // let deletedResult = connection();
      let deletedResult = await Technician.findByIdAndDelete(_id);
      if (deletedResult) {
        res.status(200).send({
          status: "success",
          message: "Technician deleted",
          technician: deletedResult,
        });
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "Technician not found" });
      }
    } catch (e) {
      res.status(404).send(e);
    }
  },

  // Logout user
  //  logoutUser: async (req, res) =>
  //  {
  //      console.log('req.user: ', req.user);
  //      const token = req.headers.authorization.split(' ')[1];
  //      console.log(token,'token');

  //      try {
  //      await jwt.destroy(token);
  //      res.status(200).json({ message: 'your are successfully deleted' });
  //      } catch {
  //      res.status(200).json({ message: 'something wrong' });
  //      }
  //  },

  // getUser: async(req,res)=>{
  //     try{
  //        let getresult=  connection();
  //           getresult= await User.find()
  //         // console.log(getresult);
  //        res.send(getresult)
  //     }catch(e)
  //     {
  //         console.log(e);
  //         res.status(400).send({  "message": "Server Error", "Error": e })
  //     }
  // },

  // getAllUser: async(req,res)=>{
  //     try{
  //        let getresult=  connection();
  //           getresult= await User.find()
  //         // console.log(getresult);
  //        res.send(getresult)
  //     }catch(e){console.log(e);}
  // },

  // getUserById:  async(req,res)=>{
  //     try{
  //         const _id = req.params.id;
  //         console.log(_id);
  //         const getIndividualResult = await User.findById(_id)
  //         // console.log(getIndividualResult,"user")
  //         res.status(201).send(getIndividualResult)
  //     }catch(e){res.send(e);}
  // },
};
