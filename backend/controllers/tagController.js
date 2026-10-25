
const tagCollection = require("../database/tagCollection");
const AppError = require('../utils/AppError');

const createTag = async (req, res) => {
   try {
      const tag = await tagCollection.createTag(req.body);
      res.status(201).json({
        success: true,
        data: tag
      });

  } catch (error) {
      next(error);
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
        next(error);
    }
};

const getTagById = async (req, res) => {
   try {
      const tag = await tagCollection.getTagById(req.params.id  );
      if (!tag) {
        throw new AppError("Tag not found", 404);
      }
      res.status(200).json({
        success: true,
        data: tag
      });

  } catch (error) {
       next(error);
    }
};

const updateTag = async (req, res) => {
  try {
      const tag = await tagCollection.updateTag(  req.params.id,  req.body);
      if (!tag) {
         throw new AppError("Tag not found", 404);
      }
      res.status(200).json({
        success: true,
        data: tag
      });
  } catch (error) {
     next(error);
  }
};

const deleteTag = async (req, res) => {
    try {
      const tag = await tagCollection.deleteTag( req.params.id );
      if (!tag) {
          throw new AppError("Tag not found", 404);
      }

      res.status(200).json({
        success: true,
        message: "Tag deleted successfully",
        data: tag
      });
  } catch (error) {
      next(error);
  }
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag
};