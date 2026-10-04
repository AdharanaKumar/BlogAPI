
const tagCollection = require("../database/tagCollection");

const createTag = async (req, res) => {
   try {

      const tag = await tagCollection.createTag(req.body);

      res.status(201).json({
        success: true,
        data: tag
      });

  } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create tag",
        error: error.message
      });
  }

};

const getAllTags = async (req, res) => {
  try {
        const tags = await tagCollection.getAllTags();

        res.status(200).json({
          success: true,
          data: tags
        });

    } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to fetch tags",
          error: error.message
        });
    }
};

const getTagById = async (req, res) => {
   try {

      const tag = await tagCollection.getTagById(
        req.params.id
      );

      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found"
        });
      }

      res.status(200).json({
        success: true,
        data: tag
      });

  } catch (error) {

      res.status(500).json({
        success: false,
        message: "Failed to fetch tag",
        error: error.message
      });
    }
};

const updateTag = async (req, res) => {
  try {
      const tag = await tagCollection.updateTag(
        req.params.id,
        req.body
      );

      if (!tag) {
        return res.status(404).json({
          success: false,
          message: "Tag not found"
        });
      }

      res.status(200).json({
        success: true,
        data: tag
      });
  } catch (error) {

      res.status(500).json({
        success: false,
        message: "Failed to update tag",
        error: error.message
      });
  }
};

const deleteTag = async (req, res) => {
    try {
      const user = await tagCollection.deleteTag(
        req.params.id
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Tag not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Tag deleted successfully",
        data: user
      });
  } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete Tag",
        error: error.message
      });
  }
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag
};