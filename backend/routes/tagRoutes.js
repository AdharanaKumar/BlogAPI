
const express = require("express");

const router = express.Router();
const tagController = require("../controllers/tagController");

router
  .route("/")
  .get(tagController.getAllTags)
  .post(tagController.createTag);

router
  .route("/:id")
  .get(tagController.getTagById)
  .put(tagController.updateTag)
  .delete(tagController.deleteTag);

module.exports = router;