const { Admin } = require("../Schemas/adminSchema");

var ObjectId = require("mongodb").ObjectId;

const env = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// import jwt from 'jsonwebtoken'
const connection = require("../dbConnection");
const emailvalidator = require("email-validator");

module.exports = {
  //----------< Authentification>  ------------------
  // id: 646fa5d66e3f6f523e3749a6

  authorizeAdmin: async (req, res, next) => {
    try {
      const id = req.params.id;
      console.log(id, "id");

      let getresult = connection();
      getresult = await Admin.findOne({
        _id: ObjectId(id),
      });
      //  console.log(getresult);

      if (getresult == null) {
        res.send({ status: "Failed", message: "Admin Not Authoriazed" });
        console.log("Admin Not Authoriazed");
      } else {
        console.log("Admin Authoriazed");
        next();
      }
    } catch (e) {
      console.log(e);
    }
  },

  //    --------------------  <Authorization>-------------------------

  //     admin id   632b3061c48a747227b4a41a

  // authorizeUser:  async(req,res,next)=>{
  //     try{
  //        const id=req.params.id;

  //        // const role=req.params.role;

  //            //  let getresult=  connection();
  //            const getresult= await User.findOne({

  //              _id: ObjectId(id),
  //                //  role:"admin"

  //           })
  //        //  console.log(getresult);

  //           if (getresult==null) {
  //             res.send("User not Authoriazed")
  //             console.log("User Not Authoriazed");

  //           }
  //           else if (getresult.role==="admin") {
  //            console.log("User Authoriazed");
  //            next()

  //          }

  //           else {

  //             // res.send("User Authenticatted")
  //             res.send("User not Authoriazed")
  //             console.log("User Not Authoriazed");
  //           }
  //     }catch(e){console.log(e);}

  // },
};

//   To check token is expired or not from jwt wbsite?

//   const jwt = require('jsonwebtoken');

// // Your JWT token
// const token = 'your_jwt_token_here';

// // Verify and decode the token
// jwt.verify(token, 'your_secret_key', (err, decoded) => {
//   if (err) {
//     // Token verification failed
//     console.error('Token verification failed:', err);
//   } else {
//     // Token verification successful
//     const expirationTimestamp = decoded.exp;
//     const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current timestamp in seconds

//     if (currentTimestamp > expirationTimestamp) {
//       console.log('Token has expired.');
//     } else {
//       console.log('Token is still valid.');
//     }
//   }
// });
