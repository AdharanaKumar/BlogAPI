
const express = require("express");

const router = express.Router();
const categoryController = require("../controllers/categoryController");
const protect = require('../middleware/protect');
router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(protect.isAdmin, categoryController.createCategory);

router
  .route("/:id")
  .get(categoryController.getCategoryById)
  .put(protect.isAdmin,categoryController.updateCategory)
  .delete(protect.isAdmin,categoryController.deleteCategory);

module.exports = router;