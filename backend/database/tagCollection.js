
const Tag = require("../models/tagModel");

const createTag = async (tagData) => {
  return await Tag.create(tagData);
};

const getAllTags = async () => {
  return await Tag.find();
};

const getTagById = async (tagId) => {
  return await Tag.findById(tagId);
};

const updateTag = async (tagId, updateData) => {
  return await Tag.findByIdAndUpdate(
    tagId,
    updateData,
    {returnDocument: "after", runValidators: true }
  );
};

const deleteTag = async (tagId) => {
  return await Tag.findByIdAndDelete(tagId);
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag
};