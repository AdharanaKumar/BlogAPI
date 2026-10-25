
const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");
const protect = require('../middleware/protect');

router
  .route("/")
  .get(tagController.getAllTags)
  .post(protect.isAdmin, tagController.createTag);

router
  .route("/:id")
  .get(tagController.getTagById)
  .put(protect.isAdmin, tagController.updateTag)
  .delete(protect.isAdmin, tagController.deleteTag);

module.exports = router;