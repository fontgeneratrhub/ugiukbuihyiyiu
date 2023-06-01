const { TechCategory } = require("../Schemas/techCategorySchema");

var ObjectId = require("mongodb").ObjectId;

const env = require("dotenv").config();
const connection = require("../dbConnection");

module.exports = {
  addCategory: async (req, res) => {
    try {
      let { title } = req.body;
      // let category = connection();

      // check all fields are filled or not
      if (!title) {
        return res
          .status(400)
          .send({ status: "failed", message: "please fill the field" });
      } else {
        // check entered category is exist in our database or not
        let result = await TechCategory.findOne({ title: title });
        if (result) {
          res
            .status(400)
            .send({ status: "failed", message: "category already exist" });
          console.log("category already exist");
        } else {
          const newCategory = new TechCategory({
            title: title,
          });
          await newCategory.save();
          console.log("category Added");
          res.status(200).send({
            status: "success",
            message: "Category added Successfully",
            category: newCategory,
          });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },

  // show Category
  getCategory: async (req, res) => {
    try {
      // let categories = connection();
      let categories = await TechCategory.find();
      // console.log(getresult);

      if (categories) {
        res.status(200).send({ status: "success", category: categories });
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "No Category found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
      console.log(e);
    }
  },

  updateCategory: async (req, res) => {
    try {
      const _id = req.params.cid;
      console.log(_id);
      // let updateResult = connection();

      let updateResult = await TechCategory.findByIdAndUpdate(_id, req.body, {
        new: true,
      });

      if (updateResult) {
        res.status(200).send({
          status: "success",
          message: "Category updated",
          category: updateResult,
        });
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "Category not found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const _id = req.params.cid;
      console.log(_id, "cid");
      // let deletedResult = connection();
      let deletedResult = await TechCategory.findByIdAndDelete(_id);
      if (deletedResult) {
        res.status(200).send({
          status: "success",
          message: "Category deleted",
          category: deletedResult,
        });
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "Category not found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },
};
